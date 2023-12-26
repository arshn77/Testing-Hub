from django.shortcuts import render
from rest_framework import generics, status
from .models import Test
from .serializer import TestSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class TestListView(generics.ListAPIView):

    queryset = Test.objects.all()

    serializer_class = TestSerializer


class TestPageView(APIView):

    serializer_class = TestSerializer

    # lookup_url_kwarg = 'id' 

    def get(self, request, id=None, format=None):

        # grabbing query parameter
        # id = request.GET.get(lookup_url_kwarg) # Could pass in lookup_url_kwarg
        # You can use query parameters if needed, but for now I'm just gonna go with
        # url parameters

        if id is not None: 

            queryset = Test.objects.filter(id=id) # returns one value in queryset
            # probably better to use .get
            
            if queryset.exists():

                data = TestSerializer(queryset[0]).data
                
                return Response(data, status=status.HTTP_200_OK)
            
            return Response({'Tester not found': 'Does not exist or invalid ID'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Tester ID required in URL'}, status=status.HTTP_400_BAD_REQUEST)








    