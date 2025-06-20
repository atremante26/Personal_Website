"""
WSGI config for backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = get_wsgi_application()

# Load fixture on deployment (Render-specific workaround)
import django
from django.core.management import call_command

django.setup()

try:
    call_command('loaddata', 'data.json')
except Exception as e:
    print("Fixture loading failed:", e)
