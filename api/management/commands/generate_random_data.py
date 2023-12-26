from django.core.management.base import BaseCommand
from api.models import Test

import random
from datetime import datetime, timedelta
from django.utils import timezone


# Clear test all test objects

class Command(BaseCommand):
    def handle(self, *args, **options):
        Test.objects.all().delete()


        # List of possible test types
        types = ['Type1', 'Type2', 'Type3', 'Type4', 'Type5']

        # List of possible progress states
        progress_states = ['Not Started', 'In Progress', 'Completed']

        # Generating a list of Test objects
        test_objects = [
            {
                'type': random.choice(types),
                'progress': random.choice(progress_states),
                'date_started': timezone.now() - timedelta(days=random.randint(0, 30)),  # Random date in the last 30 days
                'date_ended': timezone.now() if random.random() < 0.5 else None,  # 50% chance of being None
            }
            for _ in range(100)  # Change this number to the number of objects you want to create
        ]

        # Now, you can import this data in the Django shell

        for obj in test_objects:
            Test.objects.create(**obj)