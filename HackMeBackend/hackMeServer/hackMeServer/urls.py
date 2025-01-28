"""hackMeServer URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from hackServer import views  

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/decrypt-encrypted-data/', views.fetch_and_decrypt_data, name='decrypt_encrypted_data'),
    path('api/secret-data/', views.get_secret_data, name='get_secret_data'),
    path('api/encrypted-data/', views.get_encrypted_data, name='get_encrypted_data'),
    path('api/decrypt-data/', views.decrypt_data, name='decrypt_data'),
    path('api/vulnerable-search/', views.vulnerable_search, name='vulnerable_search'),  
    path('api/change-user-role/', views.change_user_role, name='change_user_role'),  
    path('api/get-sensitive-info/', views.get_sensitive_info, name='get_sensitive_info'),  
    path('api/fetch-data-from-vulnerable-api/', views.fetch_data_from_vulnerable_api, name='fetch_data_from_vulnerable_api'),  
    path('api/insecure-login/', views.insecure_login, name='insecure_login'),
    path('api/upload-file/', views.upload_file, name='upload_file'),
    path('api/log-sensitive-info/', views.log_sensitive_info, name='log_sensitive_info'),
    path('api/fetch-url/', views.fetch_url, name='fetch_url'),
    path('api/secure-login/', views.secure_login, name='secure_login'),
    path('api/secure-search/', views.secure_search, name='secure_search'),
    path('api/secure-change-user-role/', views.secure_change_user_role, name='secure_change_user_role'),
    path('api/authenticate/', views.authenticate_user, name='authenticate_user'),
    path('api/register/', views.register_user, name='register_user'),
    path('api/secure-upload-file/', views.secure_upload_file, name='secure_upload_file'), 
    path('api/all-users/', views.get_all_users, name='get_all_users'),
]
