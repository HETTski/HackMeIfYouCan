from django.shortcuts import render
from django.http import JsonResponse
from hackServer.models import User

def get_secret_data(request):
    username = request.GET.get('username')
    try:
        user = User.objects.get(username=username)
        # Intentionally bypassing authorization checks
        secret_data = user.secret_data
        return JsonResponse({'secret_data': secret_data})
    except User.DoesNotExist:
        return JsonResponse({'error': 'User does not exist'}, status=404)
