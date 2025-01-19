from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from hackServer.models import User  # Ensure this imports the correct User model
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
import base64
import json
from django.db import connection
import requests
import os
import logging
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required, user_passes_test
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User

# Hardcoded key (vulnerability)
SECRET_KEY = b'weaksecretkey123'  # 16 bytes key for AES-128

# Configure logging
logger = logging.getLogger(__name__)

def get_secret_data(request):
    # Hardcoded user data
    users_data = {
        'admin': 'This is the secret data for the admin.',
        'user1': 'This is the secret data for user1.'
    }

    username = request.GET.get('username', 'admin')  # Default to 'admin' if no username is provided

    try:
        user = User.objects.get(username=username)
        # Intentionally bypassing authorization checks
        secret_data = users_data.get(username, 'No secret data available for this user.')
        return JsonResponse({'secret_data': secret_data})
    except User.DoesNotExist:
        return JsonResponse({'error': 'User does not exist'}, status=404)


@csrf_exempt
def get_all_users(request):
    try:
        users = User.objects.all()
        user_data = [
            {"username": user.username, "email": user.email, "secret_data": user.secret_data}
            for user in users
        ]
        return JsonResponse({'users': user_data})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

def get_encrypted_data(request):
    # Example sensitive data
    sensitive_data = """
    Sernik

    Zapraszam po najlepszy przepis na sernik z wiaderka, który zawsze się udaje. Składniki przygotujesz w 10 minut. Pieczony sernik bez spodu jest maślany i delikatny. 

    Czas przygotowania: 10 minut
    Czas pieczenia: 1 godzina 20 minut
    Liczba porcji: tortownica 24 cm - około 1420 g

    W 100 gramach: Wartość energetyczna 295 kcal Dieta: bezglutenowa, wegetariańska

    Składniki

        1 kg mielonego twarogu np. gęsty z kubełka
        4 średnie jajka - około 240 g po rozbiciu
        200 g masła - 1 klasyczna kostka
        150 g cukru - około 3/4 szklanki
        1 saszetka budyniu waniliowego bez cukru - około 40 g
    """
    cipher = AES.new(SECRET_KEY, AES.MODE_CBC)
    ct_bytes = cipher.encrypt(pad(sensitive_data.encode(), AES.block_size))
    iv = base64.b64encode(cipher.iv).decode('utf-8')
    ct = base64.b64encode(ct_bytes).decode('utf-8')
    encrypted_data = iv + ct
    return JsonResponse({'encrypted_data': encrypted_data})

@csrf_exempt
def decrypt_data(request):
    try:
        data = json.loads(request.body)
        key = data.get('key').encode()  # Ensure the key is in bytes
        encrypted_data = data.get('encrypted_data')

        # Decrypt the data using the provided key
        iv = base64.b64decode(encrypted_data[:24])
        ct = base64.b64decode(encrypted_data[24:])
        cipher = AES.new(key, AES.MODE_CBC, iv)
        decrypted_data = unpad(cipher.decrypt(ct), AES.block_size).decode('utf-8')

        return JsonResponse({'decrypted_data': decrypted_data})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def secure_search(request):
    try:
        data = json.loads(request.body)
        search_term = data.get('search_term')

        # Log the search term for debugging
        logger.info(f"Search term: {search_term}")

        # Secure SQL query
        query = "SELECT id, username, email, is_staff FROM auth_user WHERE username LIKE %s"
        with connection.cursor() as cursor:
            cursor.execute(query, [f'%{search_term}%'])
            rows = cursor.fetchall()

        # Convert the result to a list of dictionaries
        result = [
            {"id": row[0], "username": row[1], "email": row[2], "is_staff": row[3]}
            for row in rows
        ]

        logger.info(f"Query result: {result}")

        return JsonResponse({'result': result})
    except Exception as e:
        logger.error(f"Error: {e}")
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def change_user_role(request):
    try:
        data = json.loads(request.body)
        username = data.get('username')
        new_role = data.get('new_role')

        # Insecure design: No authorization checks
        user = User.objects.get(username=username)
        user.is_admin = new_role.lower() == 'admin'
        user.save()

        return JsonResponse({'status': 'success', 'message': f'User {username} role changed to {new_role}'})
    except User.DoesNotExist:
        return JsonResponse({'error': 'User does not exist'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
@login_required
@user_passes_test(lambda u: u.is_superuser)
def secure_change_user_role(request):
    try:
        data = json.loads(request.body)
        username = data.get('username')
        new_role = data.get('new_role')

        user = User.objects.get(username=username)
        if new_role == 'admin':
            user.is_staff = True
            user.is_superuser = True
        else:
            user.is_staff = False
            user.is_superuser = False
        user.save()

        return JsonResponse({'message': f'Role of user {username} changed to {new_role}'})
    except User.DoesNotExist:
        return JsonResponse({'message': 'User does not exist'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def get_sensitive_info(request):
    try:
        # Security misconfiguration: Exposing sensitive information
        sensitive_info = {
            "db_password": "supersecretpassword",
            "api_key": "12345-ABCDE",
            "admin_email": "admin@example.com"
        }
        return JsonResponse({'sensitive_info': sensitive_info})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def fetch_data_from_vulnerable_api(request):
    try:
        logger.info("Received request to fetch data from vulnerable API")

        # Vulnerable and outdated component: Using an outdated version of requests library
        response = requests.get('https://jsonplaceholder.typicode.com/posts')
        data = response.json()
        return JsonResponse({'data': data})
    except Exception as e:
        logger.error(f"Error: {e}")
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def insecure_login(request):
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        # Vulnerable authentication: No proper password validation
        user = User.objects.get(username=username)
        if user:
            return JsonResponse({'status': 'success', 'message': f'User {username} logged in successfully'})
        else:
            return JsonResponse({'status': 'failure', 'message': 'Invalid credentials'}, status=401)
    except User.DoesNotExist:
        return JsonResponse({'status': 'failure', 'message': 'Invalid credentials'}, status=401)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def upload_file(request):
    try:
        if request.method == 'POST' and request.FILES['file']:
            uploaded_file = request.FILES['file']
            file_path = os.path.join('uploads', uploaded_file.name)

            # Vulnerable: No integrity check on the uploaded file
            with open(file_path, 'wb+') as destination:
                for chunk in uploaded_file.chunks():
                    destination.write(chunk)

            return JsonResponse({'status': 'success', 'message': f'File {uploaded_file.name} uploaded successfully'})
        else:
            return JsonResponse({'status': 'failure', 'message': 'No file uploaded'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def log_sensitive_info(request):
    try:
        data = json.loads(request.body)
        username = data.get('username')
        action = data.get('action')

        # Vulnerable logging: Logging sensitive information without sanitization
        logger.info(f"User {username} performed action: {action}")

        return JsonResponse({'status': 'success', 'message': f'Action {action} logged for user {username}'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

@csrf_exempt
def fetch_url(request):
    try:
        data = json.loads(request.body)
        url = data.get('url')

        # Vulnerable to SSRF: Fetching data from user-provided URL without validation
        response = requests.get(url)
        content = response.text

        return JsonResponse({'status': 'success', 'content': content})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, get_user_model
import json
import logging

# Set up logging
logger = logging.getLogger(__name__)

User = get_user_model()

@csrf_exempt
def authenticate_user(request):
    """
    Authenticates a user based on username and password.
    """
    if request.method == 'POST':
        try:
            # Parse request data
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            # Authenticate user
            user = authenticate(username=username, password=password)
            if user is not None:
                logger.info(f"User {username} authenticated successfully.")
                return JsonResponse({'authenticated': True, 'message': 'Authentication successful'}, status=200)
            else:
                logger.warning(f"Failed authentication attempt for username: {username}")
                return JsonResponse({'authenticated': False, 'message': 'Invalid credentials'}, status=401)
        except Exception as e:
            logger.error(f"Error during authentication: {str(e)}")
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)


@csrf_exempt
def register_user(request):
    """
    Registers a new user.
    """
    if request.method == 'POST':
        try:
            # Parse request data
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            email = data.get('email', '')

            # Validate input
            if not username or not password:
                return JsonResponse({'error': 'Username and password are required'}, status=400)

            # Create a new user
            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username already exists'}, status=400)

            user = User.objects.create_user(username=username, password=password, email=email)
            user.save()
            logger.info(f"User {username} registered successfully.")
            return JsonResponse({'message': 'User registered successfully'}, status=201)
        except Exception as e:
            logger.error(f"Error during user registration: {str(e)}")
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'Invalid HTTP method'}, status=405)
    
    
@csrf_exempt
def vulnerable_search(request):
    try:
        data = json.loads(request.body)
        search_term = data.get('search_term')

        # Log the search term for debugging
        logger.info(f"Search term: {search_term}")

        # Vulnerable SQL query (SQL Injection)
        query = f"SELECT * FROM auth_user WHERE username LIKE '%{search_term}%'"
        logger.info(f"Executing query: {query}")
        with connection.cursor() as cursor:
            cursor.execute(query)
            rows = cursor.fetchall()

        # Convert the result to a list of dictionaries
        result = [
            {"id": row[0], "username": row[4], "email": row[7], "is_staff": row[8]}
            for row in rows
        ]

        logger.info(f"Query result: {result}")

        return JsonResponse({'result': result})
    except Exception as e:
        logger.error(f"Error: {e}")
        return JsonResponse({'error': str(e)}, status=400)

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
import json

@csrf_exempt
def secure_login(request):
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            return JsonResponse({'message': 'Login successful'})
        else:
            return JsonResponse({'message': 'Invalid credentials'}, status=401)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

@csrf_exempt
@login_required
def secure_upload_file(request):
    try:
        if request.method == 'POST' and request.FILES['file']:
            uploaded_file = request.FILES['file']
            # Handle the uploaded file (e.g., save it to the server)
            return JsonResponse({'message': 'File uploaded successfully'})
        else:
            return JsonResponse({'message': 'No file uploaded'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
