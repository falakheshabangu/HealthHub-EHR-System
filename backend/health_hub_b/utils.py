import json


def map_treatments_to_records(patient_records, patient_treatments):
    """
    Function to map treatments to patient records.
    """
    for record in patient_records:
        record['treatment'] = [treatment for treatment in patient_treatments if treatment['treat_id'] == record['treat_id']]
    return patient_records