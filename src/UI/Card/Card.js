const Card = (props) =>{
    return <div className={`card ${props.classNamme}`}>
        <div className="card-body">
            {props.children}

        </div>

    </div>

}

export default Card;