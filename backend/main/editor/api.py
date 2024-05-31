from rest_framework import routers
from .views import farmViewSet

## Register Viewsets as APIs 
router = routers.DefaultRouter()
router.register(r"farms", farmViewSet)


urlpatterns = router.urls