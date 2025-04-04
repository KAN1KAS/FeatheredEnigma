from django.shortcuts import render, HttpResponse

def home(request):
    return render(request, 'inicio/home.html')

def history(request):
    return render(request, "inicio/history.html")

def personajes(request):
    return render(request, "inicio/personajes.html")

def about(request):
    return render(request, "inicio/about.html")

def contact(request):
    return render(request, "inicio/contact.html")

