import './Spinner.css'

const Spinner = ({size}) => {
    const style = { width: size, height: size}

    return <div className='spinner' style = {style}></div>
}

export default Spinner