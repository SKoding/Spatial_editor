from rest_framework import routers
from .views import factoryViewSet

## Register Viewsets as APIs 
router = routers.DefaultRouter()
router.register(r"Factories", factoryViewSet)

urlpatterns = router.urls