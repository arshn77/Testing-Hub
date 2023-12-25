from django.db import models


# Create your models here.
class Test(models.Model):

    # Test options
    NOT_STARTED = 'Not Started'
    IN_PROGRESS = 'In Progress'
    COMPLETED = 'Completed'


    type = models.CharField(max_length=100, blank=False, null=False) # May be a better way to validate
    progress = models.CharField(max_length=15, default=NOT_STARTED)
    date_started = models.DateTimeField(auto_now_add=True) # Might need to change auto_add_now if grabbing from another server
    date_ended = models.DateTimeField(default="")

    def you_can_add_methods():
        pass