function CourseHeader({course}) {

    const style = { background: '#212529', color: 'white', textAlign: 'center', fontSize: '.7em', padding: '.5em', width: '100%' }
    const {name} = course
    return (
        <>
            <p style={style}>{name}</p>
        </>
    )
  }
  export default CourseHeader