from rest_framework import serializers
from server.core.models.sponsors import Sponsor, RideSponsor



class RideSponsorSerializer(serializers.ModelSerializer):
  class Meta:
    model = RideSponsor
    fields = ('id', 'ride', 'sponsor', 'sponsor_level')


class SponsorSerializer(serializers.ModelSerializer):
    rides = RideSponsorSerializer(source='ridesponsor_set', many=True)

    class Meta:
        model = Sponsor