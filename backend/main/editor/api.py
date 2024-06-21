from rest_framework import routers
from .views import factoryViewSet, kapsiwonTeaViewSet, kapsiwonFeatureViewSet, taitoTeaViewSet, taitoFeatureViewSet, mokongTeaViewSet, mokongFeatureViewSet, kapsiwonPointViewSet, taitoPointViewSet, mokongPointViewSet

## Register Viewsets as APIs 
router = routers.DefaultRouter()
router.register(r"Factories", factoryViewSet)
router.register(r"KapTea", kapsiwonTeaViewSet)
router.register(r"KapFeat", kapsiwonFeatureViewSet)
router.register(r"taiTea", taitoTeaViewSet)
router.register(r"taiFeat", taitoFeatureViewSet)
router.register(r"mokTea", mokongTeaViewSet)
router.register(r"mokFeat", mokongFeatureViewSet)
router.register(r"mokPoint", mokongPointViewSet)
router.register(r"kapPoint", kapsiwonPointViewSet)
router.register(r"taiPoint", taitoPointViewSet)

urlpatterns = router.urls