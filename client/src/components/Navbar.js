import React from 'react'
//import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import AddMovieModal from './AddMovieModal'

class Nav extends React.Component {
  constructor(props) {
        super(props);
        this.state = {open:false};
        this.handleScroll = this.handleScroll.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this)
        this.handleClose =  this.handleClose.bind(this)
  
    }
    handleClickOpen() {
      this.setState({open:true})
    }
    handleClose() {
      this.setState({open:false})
      window.location.reload()
    }
    handleScroll() {
        this.setState({scroll: window.scrollY});
    }
  
  componentDidMount() {
        const el = document.querySelector('nav');
        this.setState({top: el.offsetTop, height: el.offsetHeight});
        window.addEventListener('scroll', this.handleScroll);
    }

  componentDidUpdate() {
        this.state.scroll > this.state.top ? 
            document.body.style.paddingTop = `${this.state.height}px` :
            document.body.style.paddingTop = 0;
    }
  
  render() {

    if(this.props.location.pathname === '/'){
      return (
        <React.Fragment>
          <AddMovieModal open={this.state.open} handleClose={this.handleClose}handleCloseCancel={this.handleCloseCancel}/>
          <nav className={this.state.scroll > this.state.top ? "fixed-nav" : ""}>
            <ul>
              <li onClick={()=>this.handleClickOpen()} >Add a movie</li>
            </ul>
          </nav>
        </React.Fragment>

      );
    }
  }
}

const NavRouter = withRouter(Nav);
export default NavRouter
