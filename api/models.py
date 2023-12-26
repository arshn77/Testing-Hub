from django.db import models


# Create your models here.
class Test(models.Model):

    # Progress options
    NOT_STARTED = 'Not Started'
    IN_PROGRESS = 'In Progress'
    COMPLETED = 'Completed'
    FAILED = 'Failed'


    # TODO: date_ended never has null
    # date_started is always today

    # Tester name
    name = models.CharField(max_length=100, blank=False, null=False) # May be a better way to validate
    program = models.CharField(max_length=100, blank=False, null=False)

    # Test script and it's values may need to be in their own model, but so far it's fine
    script = models.CharField(max_length=100, blank=False, null=False) 
    progress = models.CharField(max_length=15, default=NOT_STARTED)
    code_line = models.IntegerField(default=0)
    
    engineer = models.CharField(max_length=255, default="none", blank=False, null=False) 
    technician = models.CharField(max_length=255, default="none", blank=False, null=False) 


    start_date = models.DateTimeField(auto_now_add=True) # Might need to change auto_add_now if grabbing from another server
    end_date = models.DateTimeField(null=True)
    fail_date = models.DateTimeField(null=True)

    def you_can_add_methods():
        pass