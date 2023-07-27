import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { userActions, alertActions } from '_store';

function Register() {
    const dispatch = useDispatch();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        username: Yup.string()
            .required('Username is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        companyName: Yup.string()
            .required('Company Name is required'),
        corporationDate: Yup.string()
            .required('Corporation Date is required'),
        companyAddress: Yup.string()
            .required('Company Address is required'),
        documents: Yup.mixed()
            .required('Documents is required')
    });
    
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    async function onSubmit(data) {
        dispatch(alertActions.clear());
        try {
            await dispatch(userActions.register(data)).unwrap();

            dispatch(alertActions.success({ message: 'Registration successful', showAfterRedirect: true }));
        } catch (error) {
            dispatch(alertActions.error(error));
        }
    }

    return (
        <div className="card m-3">
            <h4 className="card-header">Compliance Registration</h4>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.firstName?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Last Name</label>
                        <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.lastName?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.username?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input name="confirmPassword" type="password" {...register('confirmPassword')} className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                    </div>
                    <h4 className="card-header mb-3">Business Details</h4>
                    <div className="mb-3">
                        <label className="form-label">Company Name</label>
                        <input name="companyName" type="text" {...register('companyName')} className={`form-control ${errors.companyName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.companyName?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Corporation Date</label>
                        <input name="corporationDate" type="date" {...register('corporationDate')} className={`form-control ${errors.corporationDate ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.corporationDate?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Corporation Address</label>
                        <input name="companyAddress" type="text" {...register('companyAddress')} className={`form-control ${errors.companyAddress ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.companyAddress?.message}</div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">File Upload</label>
                        <input type="file" {...register('documents')} className={`form-control ${errors.documents ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.documents?.message}</div>
                    </div>
                    <button disabled={isSubmitting} className="btn btn-primary">
                        {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export { Register };
