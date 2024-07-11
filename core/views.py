from django.shortcuts import render,redirect
from django.http import HttpResponse, JsonResponse
from .forms import RegistrationForm, LoginForm, TaskSerializer
from django.contrib.auth import logout
from django.contrib.auth.models import User
from .models import Task
import json
from django.views.generic import CreateView

from django.contrib.auth import logout, authenticate, login

from django.contrib.auth.decorators import login_required

from django.db.models import Q

def Home(request):
    
    users = User.objects.exclude(id = request.user.id).all()
    
    
    if request.method == "POST":
        
        if request.user.is_authenticated:
            
            
            title = request.POST['title']
            category = request.POST['category']
            user = request.POST['user']
            status = request.POST['status']
            priority = request.POST['priority']
            desc = request.POST['desc']
            due = request.POST['due']
            
            newTask = Task.objects.create(
                title = title,
                category = category,
                assigned_to = User.objects.get(id = user),
                status = status,
                priority = priority,
                description = desc,
                due_date = due
            )
            
            return JsonResponse(data="success", safe=False, status=200)
            
            
            
        else:
            return JsonResponse(data={"error": "unauthorized"}, safe=False, status=400)
    
    context ={
        "user": request.user,
        'allusers': users,
    }
    
    return render(request, "home.html", context)

def register(request):
    
    if request.method == "POST":
        
        user = RegistrationForm(data=request.POST)
        
        if user.is_valid():
            email = user.data['email']
            username = user.data['username']
            password = user.data['password']
            fname = user.data['firstname']
            lname = user.data['lastname']
            
            check_username = User.objects.filter(username = username).first()
            check_email = User.objects.filter(email = email).first()
            
            
            
            if email == "" or username == "" or password == "":
                return JsonResponse(data={"fields": "field cannot be empty"}, safe=False, status=400)
            
            elif check_username is not None:
                return JsonResponse(data={"username":"username already exists"}, safe=False, status=400)
                
            elif check_email is not None:
                return JsonResponse(data={"email":"email already exists"}, safe=False, status=400)
            
            else:
                user = User.objects.create_user(
                    first_name = fname,
                    last_name = lname,
                    email = email,
                    username= username,
                    password = password
                )    
                
                user.save()
                
            
                return JsonResponse(data={"success": True}, safe=False, status=200)
        else:
            return JsonResponse(data=user.errors,safe=False,status=400)
        
    
    context = {
        'form': RegistrationForm
    }
    
    return render(request, "register.html", context)

def LoginView(request):
    
    if request.method == "POST":
        user = LoginForm(data=request.POST)
        
        if user.is_valid():
           
            username = user.data['username']
            password = user.data['password']
            
            
            
            chk = authenticate(username = username, password = password)
            
            if chk is None:
                return JsonResponse(data={"error":"Invalid Credentials"}, safe=False, status=400)
            
            else:
                
                login(request, chk)    
                
                return JsonResponse(data={"success": True}, safe=False, status=200)
        else:
            return JsonResponse(data=user.errors,safe=False,status=400)
        
    
    context = {
        'form': LoginForm
    }
    
    return render(request, "login.html", context)


def logout_view(request):
  logout(request)
  return redirect('/login')


@login_required(login_url="/login")
def getTasks(request):
    
    inP = list(Task.objects.all().values())
    

    
    return JsonResponse(data=inP, safe=False,status=200)

@login_required(login_url="/login")
def sortByLow(request):
    
    inP = list(Task.objects.all().order_by("-priority").values())
    
    
    
    
    

    
    return JsonResponse(data=inP, safe=False,status=200)



@login_required(login_url="/login")
def deleteTask(request, id):
    users = User.objects.exclude(id = request.user.id).all()
    
    context ={
        "user": request.user,
        'allusers': users,
    }
    
    if request.method == "GET":
        

        task = Task.objects.filter(id =id).first()
        
        if task is not None:
            
            task.delete()
            
            return JsonResponse(data="success", safe=False, status=200)
            
        else:
            
            return JsonResponse(data="invalid task", safe=False, status=400)
    
        
    return render(request, "home.html", context)

@login_required(login_url="/login")
def fetchTask(request, id):
    users = User.objects.exclude(id = request.user.id).all()
    
    context ={
        "user": request.user,
        'allusers': users,
    }
    
    if request.method == "GET":
        

        task = Task.objects.filter(id =id).first()
        
        if task is not None:
            
            
            return JsonResponse(data={"title": task.title, "desc": task.description, "id": task.id, "priority": task.priority, "status": task.status}, safe=False, status=200)
            
        else:
            
            return JsonResponse(data="invalid task", safe=False, status=400)
    
        
    return render(request, "home.html", context)

@login_required(login_url="/login")
def updateTask(request):
    users = User.objects.exclude(id = request.user.id).all()
    
    context ={
        "user": request.user,
        'allusers': users,
    }
    
    if request.method == "POST":
        

        task = Task.objects.filter(id =request.POST['id']).first()
        
        if task is not None:
            
            task.title = request.POST['title']
            task.description = request.POST['desc']
            task.status = request.POST['status']
            task.priority = request.POST['priority']
            
            task.save()
            
            return JsonResponse(data="success", safe=False, status=200)
            
        else:
            
            return JsonResponse(data="invalid task", safe=False, status=400)
    
        
    return render(request, "home.html", context)


@login_required(login_url="/login")
def searchTask(request, q):
    users = User.objects.exclude(id = request.user.id).all()
    
    
    context ={
        "user": request.user,
        'allusers': users,
    }
    
    if request.method == "GET":
        

        tasks = list(Task.objects.filter(Q(title__icontains = q) | Q(description__icontains = q) | Q(status__icontains = q) | Q(priority__icontains = q)).all().values())    
        
        return JsonResponse(data=tasks, safe=False, status=200)
            
      
        
    return render(request, "home.html", context)