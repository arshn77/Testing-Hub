from django.core.management.base import BaseCommand
from api.models import Test

import random
from datetime import datetime, timedelta
from django.utils import timezone


# Clear test all test objects

class Command(BaseCommand):
    def handle(self, *args, **options):
        Test.objects.all().delete()


        # Names
        names = ['Tester1', ' Tester2', ' Tester3', ' Tester4', ' Tester5']

        programs = ['Program1', ' Program2', ' Program3', ' Program4', ' Program5']


        # List of possible test types
        scripts = ['Script1', 'Script2', 'Script3', 'Script4', 'Script5']


       
        # List of possible progress states
        progress_states = [Test.NOT_STARTED, Test.IN_PROGRESS, Test.COMPLETED, Test.FAILED]

        # List of possible engineers and technicians
        engineers = ['Engineer1', 'Engineer2', 'Engineer3']
        technicians = ['Technician1', 'Technician2', 'Technician3']


        # Generating a list of Test objects
        test_objects = [
            {
                'name': random.choice(names),
                'program': random.choice(programs),
                'script': random.choice(scripts),
                'code_line': random.randint(0, 100),
                'engineer': random.choice(engineers),
                'technician': random.choice(technicians),
                'progress': random.choice(progress_states),
                'start_date': timezone.now() - timedelta(days=random.randint(0, 30)),  # Random date in the last 30 days
                'end_date': timezone.now() if random.random() < 0.5 else None,  # 50% chance of being None
            }
            for _ in range(100)  # Change this number to the number of objects you want to create
        ]

        # Only failed tests get fail dates
        for obj in test_objects:
            if obj['progress'] == Test.FAILED:
                obj['fail_date'] = timezone.now() - timedelta(days=random.randint(0, 30))
            else:
                obj['fail_date'] = None
            Test.objects.create(**obj)