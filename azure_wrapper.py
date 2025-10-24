from azure.quantum.target import Target
from azure.quantum import Workspace
import os


class AzureWrapper:
    _instance = None

    def __new__(cls, target: Target = None):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self, target: Target = None):
        if not self._initialized:
            self._target = target
            self._initialized = True

    @classmethod
    def get_target(cls):
        target = os.environ.get("AZURE_SIMULATOR", "ionq.simulator")
        workspace = Workspace.from_connection_string("SubscriptionId=c0da2d56-f142-4d6d-b9f4-ae98239b0945;ResourceGroupName=QAI_Hack2025;WorkspaceName=Calgary-dev;ApiKey=_lzOZvyzXY53q6d9mE06TU_hkoksZufsKzt0y-hIL7xQEwmapP0-agThLFC24jWiBhlmg65J2EOSAZQURENKyQ;QuantumEndpoint=https://eastus.quantum.azure.com/;")
        return workspace.get_targets(target)
    
    @classmethod
    def get_target_qiskit(cls):
        from azure.quantum.qiskit import AzureQuantumProvider
        target = os.environ.get("AZURE_SIMULATOR", "ionq.simulator")
        workspace = Workspace.from_connection_string("SubscriptionId=c0da2d56-f142-4d6d-b9f4-ae98239b0945;ResourceGroupName=QAI_Hack2025;WorkspaceName=Calgary-dev;ApiKey=_lzOZvyzXY53q6d9mE06TU_hkoksZufsKzt0y-hIL7xQEwmapP0-agThLFC24jWiBhlmg65J2EOSAZQURENKyQ;QuantumEndpoint=https://eastus.quantum.azure.com/;")
        provider = AzureQuantumProvider(workspace)
        return provider.get_backend("ionq.simulator")
