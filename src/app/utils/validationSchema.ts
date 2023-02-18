import * as yup from 'yup'

export const transferValidationSchema = yup.object().shape({
    lotNumber: yup.string().required('Please Select A Lot Number'),
    whName: yup.string().required('Please Select Your Current Location'),
    showroomName: yup.string().required('Please Select You Destination Showroom'),
    itemCodes: yup.array().required('Please Add Some Product To Transfer')
})