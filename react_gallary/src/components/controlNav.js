import React from 'react';
import ReactDOM from 'react-dom';

class ControlNav extends React.Component{
	constructor(props){
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e){
		if(this.props.imgInfo.isCenter){
			this.props.reverse();
		}
		else{
			this.props.center();
		}
		e.preventDefault();
		e.stopPropagation();
	}
	render(){
		let controlerClass = "controlNav";
		controlerClass+=(this.props.imgInfo.isCenter?" isCenter":"");
		controlerClass+=(this.props.imgInfo.isReverse?" reverse":"");
		return (
			<span className={controlerClass} onClick = {this.handleClick}>
			</span>
		);
	}
}
export default ControlNav;