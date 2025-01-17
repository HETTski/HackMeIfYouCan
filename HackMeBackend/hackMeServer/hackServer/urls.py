from django.contrib import admin
from django.urls import path
from hackServer import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/secure-search/', views.secure_search, name='secure_search'),
    path('api/secure-change-user-role/', views.secure_change_user_role, name='secure_change_user_role'),
    path('api/secret-data/', views.get_secret_data, name='get_secret_data'),
    path('api/encrypted-data/', views.get_encrypted_data, name='get_encrypted_data'),
    path('api/decrypt-data/', views.decrypt_data, name='decrypt_data'),
    path('api/authenticate/', views.authenticate_user, name='authenticate_user'),
    path('api/vulnerable-search/', views.vulnerable_search, name='vulnerable_search'),
    path('api/change-user-role/', views.change_user_role, name='change_user_role'),
    path('api/get-sensitive-info/', views.get_sensitive_info, name='get_sensitive_info'),
    path('api/fetch-data-from-vulnerable-api/', views.fetch_data_from_vulnerable_api, name='fetch_data_from_vulnerable_api'),
    path('api/insecure-login/', views.insecure_login, name='insecure_login'),
    path('api/upload-file/', views.upload_file, name='upload_file'),
    path('api/log-sensitive-info/', views.log_sensitive_info, name='log_sensitive_info'),
    path('api/fetch-url/', views.fetch_url, name='fetch_url'),
    path('api/secure-login/', views.secure_login, name='secure_login'),
    path('api/secure-upload-file/', views.secure_upload_file, name='secure_upload_file'), 
    path('api/secure-log-action/', views.secure_log_action, name='secure_log_action'),
    path('api/secure-fetch-url/', views.secure_fetch_url, name='secure_fetch_url'),
    
    
]