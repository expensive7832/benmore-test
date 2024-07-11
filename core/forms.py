from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm, PasswordChangeForm, UsernameField, PasswordResetForm, SetPasswordForm
from django.contrib.auth.models import User
from .models import Task
from django.utils.translation import gettext_lazy as _


class TaskSerializer(forms.ModelForm):
  class Meta:
    model = Task
    fields = '__all__'

class RegistrationForm(forms.Form):
  
    
    firstname = forms.CharField(
        widget= forms.TextInput(attrs={
          'class': 'text-sm capitalize focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow',
          'placeholder': 'enter your first name',
          'name': 'firstname'

      })
    )
    lastname = forms.CharField(
        widget= forms.TextInput(attrs={
          'class': 'text-sm capitalize focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow',
          'placeholder': 'enter your last name',
          'name': 'lastname'
      })
    )
    
    email = forms.EmailField(
        widget= forms.EmailInput(attrs={
          'class': 'text-sm capitalize focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow',
          'placeholder': 'enter your Email',
          'name': 'email'
      })
    )
   
    username = forms.CharField(
        widget=forms.TextInput(attrs={
          'class': 'text-sm capitalize focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow',
          'placeholder': 'enter your Username',
          'name': "username"
      })
    )   
   
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
          'class': 'text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow', 'placeholder': 'Password', 'name': "password"  
        })
    )
   
    


class LoginForm(forms.Form):
  username = UsernameField(
    widget=forms.TextInput(attrs={
      "class": "focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow", 
      "placeholder": "Username",
      "name": "username"
      }))
  password = forms.CharField(
      label=_("Password"),
      strip=False,
      widget=forms.PasswordInput(attrs={"class": "focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow", "placeholder": "Password",
      "name":"email"
      }),
  )

class UserPasswordResetForm(PasswordResetForm):
    email = forms.EmailField(widget=forms.EmailInput(attrs={
        'class': 'focus:shadow-soft-primary-outline text-sm leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-2 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:outline-none focus:transition-shadow',
        'placeholder': 'Email'
    }))
