require('normalize.css/normalize.css');
require('styles/App.less');

import ImgFigure from './imgFigure.js';
import ControlNav from './controlNav.js';
import React from 'react';
import {findDOMNode} from 'react-dom';
import imageJsonDatas from '../stores/fileName.json'; 

/*从fileName.json获取图片地址，如果没有json-loader该对象是个空对象！！*/
for(let index in imageJsonDatas){
	let singleImg = imageJsonDatas[index];
	singleImg.url = require('../images/'+singleImg.fileName);
	imageJsonDatas[index] = singleImg;
}
function getRandomNum(left,right){
	let length = right -left+1;
	return left+Math.floor(Math.random()*length);
}
class AppComponent extends React.Component {
  constructor(props){
  	super(props);
  	this.state = {
  		ImgDatas : []
  	};
  	this.stageData = {
  		centerSection:{left:0,top:0},
  		leftSection:  {x:[0,0],y:[0,0]},
  		rightSection: {x:[0,0],y:[0,0]},
  		topSection:   {x:[0,0],y:[0,0]}
  	};

  }
  componentDidMount(){
  	let stageDOM = findDOMNode(this.refs["stage"]);
  	let stageW = stageDOM.offsetWidth;
  	let stageH = stageDOM.offsetHeight;
  	let halfStaW = Math.ceil(stageW/2);
  	let halfStaH = Math.ceil(stageH/2);
  	
  	let imageDOM = findDOMNode(this.refs["img0"]),
  		imageW = imageDOM.offsetWidth,
  		imageH = imageDOM.offsetHeight,
  		halfImgW = Math.ceil(imageW/2),
  		halfImgH = Math.ceil(imageH/2);
  	
  	this.stageData.centerSection = {
  		left:halfStaW-halfImgW,
  		top:halfStaH-halfImgH
  	};
  	this.stageData.topSection = {
  		x:[halfStaW-halfImgW*3,halfStaW+halfImgW*3],
  		y:[0,halfStaH-halfImgH-halfImgH*3]
  	}
  	this.stageData.leftSection = {
  		x:[0,halfStaW-halfImgW*3],
  		y:[0,stageH-halfImgH]
  	};
  	this.stageData.rightSection = {
  		x:[halfStaW+halfImgW*3,stageW-imageW],
  		y:[0,stageH-halfImgH]
  	}
  	this.arrange(0);
  }
  center(index){
  	this.arrange(index);
  }
  reverse(index){
  	let {ImgDatas} = this.state;
  	ImgDatas[index].isReverse = !ImgDatas[index].isReverse; 
  	this.setState({ImgDatas});
  }

  arrange(centerIndex){
  	
  	let {ImgDatas} = this.state;
  	let {centerSection,leftSection,rightSection,topSection} = this.stageData;
  	let centerFigure = ImgDatas.splice(centerIndex,1);
  	
  	let topIndex = Math.floor(Math.random()*ImgDatas.length);
  	let topNum = Math.floor(Math.random()*2);
  	let topFigure = ImgDatas.splice(topIndex,topNum);

  	centerFigure = {
  		pos:centerSection,
  		isCenter:true,
  		rotate:0
  	};
  	if(topFigure.length!=0){
  		topFigure = {
  			pos:{
  				left:getRandomNum(topSection.x[0],topSection.x[1]),
  				top:getRandomNum(topSection.y[0],topSection.y[1])
  			},
  			isCenter:false,
  			rotate:getRandomNum(-30,30)
  		};
  	}
  	let mid = ImgDatas.length/2;
  	for(let i = 0;i<ImgDatas.length;i++){
  		let tempRange = i<mid?leftSection:rightSection;
  		ImgDatas[i] = {
  			pos:{
  				left:getRandomNum(tempRange.x[0],tempRange.x[1]),
  				top:getRandomNum(tempRange.y[0],tempRange.y[1])
  			},
  			isCenter:false,
  			rotate:getRandomNum(-30,30)
  		};
  	}
  	if(topNum!=0) ImgDatas.splice(topIndex,0,topFigure);
  	ImgDatas.splice(centerIndex,0,centerFigure);
  	this.setState(ImgDatas);
  }
  
  render() {
    let imgFigures = [];
    let controlerUnits = [];
    imageJsonDatas.forEach((item,index)=>{
    	if(!this.state.ImgDatas[index]){
    		this.state.ImgDatas[index] = {
    			pos:{
    				left:0,
    				top:0
    			},
    			rotate:0,
    			isReverse:false,
    			isCenter:false
    		}
    	};
    	let commonProps = {
    		imgInfo : this.state.ImgDatas[index],
    		reverse : this.reverse.bind(this,index),
    		
    		center : this.center.bind(this,index)
    	};
    	imgFigures.push(<ImgFigure data={item} ref = {"img"+index} {...commonProps}/>);
    	controlerUnits.push(<ControlNav {...commonProps}/>);
    });
    return (
      <section className="stage" ref = "stage">
      	<section className="figureImgs" >{imgFigures}</section>
      	<nav className="controlerUnits">{controlerUnits}</nav>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
