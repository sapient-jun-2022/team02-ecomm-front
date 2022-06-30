import styles from './SignUp.module.css';
const SignUp = () =>{
    return <section className={styles['login-box']}>
    <div className="card">
        <div className="card-body">
            <h1 className='text-center'>Sign Up</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputNameassword1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="exampleInputNameassword1" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                
                <button type="submit" className="btn btn-primary">Sign Up</button> </form>

        </div>

    </div>
</section>
}
export default SignUp;