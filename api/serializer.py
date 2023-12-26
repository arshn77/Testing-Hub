from rest_framework import serializers
from .models import Test


class TestSerializer(serializers.ModelSerializer):

    class Meta:
        model = Test
        fields = ('id', 'name', 'program', 'script', 'progress', 'code_line', 'engineer', 'technician', 'start_date', 'end_date', 'fail_date')