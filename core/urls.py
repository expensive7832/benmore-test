from django.urls import path
from . import views

urlpatterns = [
    path("", views.Home), 
    path("register/", views.register), 
    path("login/", views.LoginView), 
    path("logout/", views.logout_view), 
    path("tasks/", views.getTasks), 
    path("delete/<int:id>", views.deleteTask), 
    path("update/<int:id>", views.fetchTask), 
    path("updatetask/", views.updateTask), 
    path("sortbylow/", views.sortByLow), 
    path("search/<str:q>", views.searchTask), 
    
]