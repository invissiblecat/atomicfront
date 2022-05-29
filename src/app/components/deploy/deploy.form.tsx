import './deploy.form.sass'

const NewOrderForm = () => {

    return (
        <>
        <div className="newOrder">
            <div className='newOrder__title'> Create your own swap</div>
            <div className="newOrder__form-inner">
                <span className='newOrder__form-tokenInfo'>
                    <input className="newOrder__form-input" placeholder='From'></input>
                    <select className='newOrder__form-select'></select> 
                </span>
                <span className='newOrder__form-tokenInfo'>
                    <input className="newOrder__form-input" placeholder='To'></input>
                    <select className='newOrder__form-select'></select> 
                </span>
                <button className= 'newOrder__form-button' placeholder='Create order'>Create new order</button>
            </div>
        </div>
        </>
    )
}


export default NewOrderForm;