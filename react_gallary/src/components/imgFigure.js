import React from 'react';
import ReactDOM from 'react-dom';

class ImgFigure extends React.Component{
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
	getStyleObj(){
		
		let styleObj = {
			left:this.props.imgInfo.pos.left+'px',
			top:this.props.imgInfo.pos.top+'px'
		};
		if(this.props.imgInfo.rotate){
			
			let prefix = ['MozTransform','MsTransform','WebkitTransform','transform'];
			prefix.forEach((value)=>{
				styleObj[value] = `rotate(${this.props.imgInfo.rotate}deg)`;
			}); 
		}
		if(this.props.imgInfo.isCenter) {
			styleObj.zIndex = 11;
		}
		return styleObj;
	}
	render(){
		let styleObj = this.getStyleObj();
		let imgStyle = "imgfigure";
		imgStyle += this.props.imgInfo.isReverse?" reverse":"";
		return (
			<figure className = {imgStyle}  style = {styleObj} onClick={this.handleClick}>
				<img src = {this.props.data.url} alt = {this.props.data.desc}/>
				<div className = "backface">{this.props.data.desc}</div>
				<figurecaption>
					<h3>{this.props.data.title}</h3>

				</figurecaption>
			</figure>
		);
	}
}
export default ImgFigure;