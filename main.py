import qsharp
import azure.quantum
from azure_wrapper import AzureWrapper
import os
from azure.quantum import JobStatus
import time
def string_to_binary_int(s):
    s = s.strip('[]').replace(' ', '')
    numbers = s.split(',')
    binary_string = ''.join(numbers)
    result = int(binary_string, 2)
    return result
def run(input_data, solver_params, extra_arguments):
    
    ##### THIW IS HOW YOU READ INPUT DATA FROM JSON #####
    
    #data = input_data['adj_matrix'] # dummy example
    #data
    #######################################################


    
    qsharp.init(target_profile=qsharp.TargetProfile.Base,project_root=".")
    nQubits=2
    # Compile the qsharp operation
    operation = qsharp.compile(f"test.Run({nQubits})")
    
    ####### THIS IS HOW YOU GET THE TARGET #########
    target= AzureWrapper.get_target()
    
    # Execute the job. We'll use 100 shots (simulated runs).
    job = target.submit(operation, "QFT", shots=100)

    while(job.details.status in [JobStatus.EXECUTING,JobStatus.WAITING]):
        time.sleep(100)
        job.refresh()

    result = job.get_results() 
    print()
    return {string_to_binary_int(r):result[r] for r in result}