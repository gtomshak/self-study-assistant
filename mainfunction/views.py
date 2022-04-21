from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import FormulaPaper
from todo_list.models import Task
# Create your views here.


def home(response):
	if response.user.is_authenticated:
		tk = Task.objects.filter(user=response.user).count
		fp = FormulaPaper.objects.all()
		return render(response, "mainfunction/home.html", {"fp":fp, "tk":tk})
	else:
		return redirect("/login/")

def locate(response):
	if response.user.is_authenticated:
		return render(response, "mainfunction/locate.html", {})
	else:
		return redirect("/login/")

def formula(response):
	if response.user.is_authenticated:
		return render(response, "mainfunction/formula.html", {})
	else:
		return redirect("/login/")

def pomodoro(response):
	if response.user.is_authenticated:
		return render(response, "mainfunction/pomodoro.html", {})
	else:
		return redirect("/login/")


				

