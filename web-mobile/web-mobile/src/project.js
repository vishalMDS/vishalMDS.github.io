window.__require=function t(e,i,a){function n(o,r){if(!i[o]){if(!e[o]){var c=o.split("/");if(c=c[c.length-1],!e[c]){var h="function"==typeof __require&&__require;if(!r&&h)return h(c,!0);if(s)return s(c,!0);throw new Error("Cannot find module '"+o+"'")}o=c}var _=i[o]={exports:{}};e[o][0].call(_.exports,function(t){return n(e[o][1][t]||t)},_,_.exports,t,e,i,a)}return i[o].exports}for(var s="function"==typeof __require&&__require,o=0;o<a.length;o++)n(a[o]);return n}({DragonBonesCtrl:[function(t,e,i){"use strict";if(cc._RF.push(e,"c6d93FzBLtDcI5ttUyFHAQj","DragonBonesCtrl"),!cc.runtime){var a=["weapon_1502b_r","weapon_1005","weapon_1005b","weapon_1005c","weapon_1005d","weapon_1005e"],n=["weapon_1502b_l","weapon_1005","weapon_1005b","weapon_1005c","weapon_1005d"],s=["mecha_1502b","skin_a","skin_b","skin_c"];cc.Class({extends:cc.Component,editor:{requireComponent:dragonBones.ArmatureDisplay},properties:{touchHandler:{default:null,type:cc.Node},upButton:{default:null,type:cc.Node},downButton:{default:null,type:cc.Node},leftButton:{default:null,type:cc.Node},rightButton:{default:null,type:cc.Node},weaponArmature:{default:null,type:dragonBones.ArmatureDisplay},skinArmature:{default:null,type:dragonBones.ArmatureDisplay},_bullets:[],_left:!1,_right:!1,_isJumpingA:!1,_isJumpingB:!1,_isSquating:!1,_isAttackingA:!1,_isAttackingB:!1,_weaponRIndex:0,_weaponLIndex:0,_skinIndex:0,_faceDir:1,_aimDir:0,_moveDir:0,_aimRadian:0,_speedX:0,_speedY:0,_armature:null,_armatureDisplay:null,_weaponR:null,_weaponL:null,_aimState:null,_walkState:null,_attackState:null,_target:cc.v2(0,0)},onLoad:function(){var t=this;this._armatureDisplay=this.getComponent(dragonBones.ArmatureDisplay),this._armature=this._armatureDisplay.armature(),this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_IN_COMPLETE,this._animationEventHandler,this),this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE,this._animationEventHandler,this),this._armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE,this._animationEventHandler,this),this._weaponR=this._armature.getSlot("weapon_r").childArmature,this._weaponL=this._armature.getSlot("weapon_l").childArmature,this._weaponR.addEventListener(dragonBones.EventObject.FRAME_EVENT,this._frameEventHandler,this),this._weaponL.addEventListener(dragonBones.EventObject.FRAME_EVENT,this._frameEventHandler,this);for(var e=1;e<s.length;e++)this.skinArmature.armatureName=s[e];for(var i=1;i<a.length;i++)this.weaponArmature.armatureName=a[i];this._updateAnimation(),this.touchHandler&&(this.touchHandler.on(cc.Node.EventType.TOUCH_START,function(e){t._mouseDown_=!0;var i=e.getTouches()[0].getLocation();t.aim(i.x,i.y),t.attack(!0)},this),this.touchHandler.on(cc.Node.EventType.TOUCH_END,function(e){t._mouseDown_=!1,t.attack(!1)},this),this.touchHandler.on(cc.Node.EventType.TOUCH_MOVE,function(e){var i=e.getTouches()[0].getLocation();t.aim(i.x,i.y)},this)),this.upButton&&this.upButton.on(cc.Node.EventType.TOUCH_START,function(e){t.jump()},this),this.downButton&&(this.downButton.on(cc.Node.EventType.TOUCH_START,function(e){t.squat(!0)},this),this.downButton.on(cc.Node.EventType.TOUCH_END,function(e){t.squat(!1)},this),this.downButton.on(cc.Node.EventType.TOUCH_CANCEL,function(e){t.squat(!1)},this)),this.leftButton&&(this.leftButton.on(cc.Node.EventType.TOUCH_START,function(e){t._left=!0,t._updateMove(-1)},this),this.leftButton.on(cc.Node.EventType.TOUCH_END,function(e){t._left=!1,t._updateMove(-1)},this),this.leftButton.on(cc.Node.EventType.TOUCH_CANCEL,function(e){t._left=!1,t._updateMove(-1)},this)),this.rightButton&&(this.rightButton.on(cc.Node.EventType.TOUCH_START,function(e){t._right=!0,t._updateMove(1)},this),this.rightButton.on(cc.Node.EventType.TOUCH_END,function(e){t._right=!1,t._updateMove(1)},this),this.rightButton.on(cc.Node.EventType.TOUCH_CANCEL,function(e){t._right=!1,t._updateMove(1)},this)),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,function(t){this._keyHandler(t.keyCode,!0)},this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,function(t){this._keyHandler(t.keyCode,!1)},this)},_keyHandler:function(t,e){switch(t){case cc.macro.KEY.a:case cc.macro.KEY.left:this._left=e,this._updateMove(-1);break;case cc.macro.KEY.d:case cc.macro.KEY.right:this._right=e,this._updateMove(1);break;case cc.macro.KEY.w:case cc.macro.KEY.up:e&&this.jump();break;case cc.macro.KEY.s:case cc.macro.KEY.down:this.squat(e);break;case cc.macro.KEY.q:e&&this.switchWeaponR();break;case cc.macro.KEY.e:e&&this.switchWeaponL();break;case cc.macro.KEY.space:e&&(this.switchWeaponR(),this.switchWeaponL());break;default:return}},_updateMove:function(t){this._left&&this._right?this.move(t):this._left?this.move(-1):this._right?this.move(1):this.move(0)},move:function(t){this._moveDir!==t&&(this._moveDir=t,this._updateAnimation())},jump:function(){this._isJumpingA||(this._isJumpingA=!0,this._armature.animation.fadeIn("jump_1",-1,-1,0,"normal"),this._walkState=null)},squat:function(t){this._isSquating!==t&&(this._isSquating=t,this._updateAnimation())},attack:function(t){this._isAttackingA!=t&&(this._isAttackingA=t)},switchWeaponL:function(){this._weaponL.removeEventListener(dragonBones.EventObject.FRAME_EVENT,this._frameEventHandler,this),this._weaponLIndex++,this._weaponLIndex>=n.length&&(this._weaponLIndex=0);var t=n[this._weaponLIndex],e=dragonBones.CCFactory.getInstance();this._weaponL=e.buildArmature(t),this._armature.getSlot("weapon_l").childArmature=this._weaponL,this._weaponL.addEventListener(dragonBones.EventObject.FRAME_EVENT,this._frameEventHandler,this)},switchWeaponR:function(){this._weaponR.removeEventListener(dragonBones.EventObject.FRAME_EVENT,this._frameEventHandler,this),this._weaponRIndex++,this._weaponRIndex>=a.length&&(this._weaponRIndex=0);var t=a[this._weaponRIndex],e=dragonBones.CCFactory.getInstance();this._weaponR=e.buildArmature(t),this._armature.getSlot("weapon_r").childArmature=this._weaponR,this._weaponR.addEventListener(dragonBones.EventObject.FRAME_EVENT,this._frameEventHandler,this)},switchSkin:function(){this._skinIndex++,this._skinIndex>=s.length&&(this._skinIndex=0);var t=s[this._skinIndex],e=dragonBones.CCFactory.getInstance(),i=e.getArmatureData(t).defaultSkin;e.replaceSkin(this._armatureDisplay.armature(),i,!1,["weapon_l","weapon_r"])},aim:function(t,e){0===this._aimDir&&(this._aimDir=10),this._target=this.node.parent.convertToNodeSpaceAR(cc.v2(t,e))},update:function(t){this._updatePosition(),this._updateAim(),this._updateAttack(),this._enterFrameHandler(t)},onDisable:function(){for(var t=this._bullets.length-1;t>=0;t--){this._bullets[t].enabled=!1}this._bullets=[]},addBullet:function(t){this._bullets.push(t)},_enterFrameHandler:function(t){for(var e=this._bullets.length-1;e>=0;e--){this._bullets[e].update()&&this._bullets.splice(e,1)}},_animationEventHandler:function(t){t.type===dragonBones.EventObject.FADE_IN_COMPLETE?"jump_1"===t.animationState.name?(this._isJumpingB=!0,this._speedY=20,0!=this._moveDir&&(this._moveDir*this._faceDir>0?this._speedX=5.04*this._faceDir:this._speedX=-3.6*this._faceDir),this._armature.animation.fadeIn("jump_2",-1,-1,0,"normal").resetToPose=!1):"jump_4"===t.animationState.name&&this._updateAnimation():t.type===dragonBones.EventObject.FADE_OUT_COMPLETE?"attack_01"===t.animationState.name&&(this._isAttackingB=!1,this._attackState=null):t.type===dragonBones.EventObject.COMPLETE&&"jump_4"===t.animationState.name&&(this._isJumpingA=!1,this._isJumpingB=!1,this._updateAnimation())},_frameEventHandler:function(t){if("fire"===t.name){var e=cc.v2(t.bone.global.x,t.bone.global.y),i=t.armature.display.node.convertToWorldSpace(e);this._fire(i)}},_fire:function(t){t.x+=2*Math.random()-1,t.y+=2*Math.random()-1;var e=this._armatureDisplay.buildArmature("bullet_01"),i=this._armatureDisplay.buildArmature("fire_effect_01"),a=this._faceDir<0?Math.PI-this._aimRadian:this._aimRadian,n=new o;n.init(this.node.parent,e,i,a+.02*Math.random()-.01,40,t),this.addBullet(n)},_updateAnimation:function(){if(!this._isJumpingA)return this._isSquating?(this._speedX=0,this._armature.animation.fadeIn("squat",-1,-1,0,"normal").resetToPose=!1,void(this._walkState=null)):void(0===this._moveDir?(this._speedX=0,this._armature.animation.fadeIn("idle",-1,-1,0,"normal").resetToPose=!1,this._walkState=null):(this._walkState||(this._walkState=this._armature.animation.fadeIn("walk",-1,-1,0,"normal"),this._walkState.resetToPose=!1),this._moveDir*this._faceDir>0?this._walkState.timeScale=1.4:this._walkState.timeScale=-1,this._moveDir*this._faceDir>0?this._speedX=5.04*this._faceDir:this._speedX=-3.6*this._faceDir))},_updatePosition:function(){if(0!==this._speedX){this.node.x+=this._speedX;var t=-cc.visibleRect.width/2,e=cc.visibleRect.width/2;this.node.x<t?this.node.x=t:this.node.x>e&&(this.node.x=e)}0!=this._speedY&&(this._speedY>5&&this._speedY+-.6<=5&&(this._armature.animation.fadeIn("jump_3",-1,-1,0,"normal").resetToPose=!1),this._speedY+=-.6,this.node.y+=this._speedY,this.node.y<-200&&(this.node.y=-200,this._speedY=0,this._armature.animation.fadeIn("jump_4",-1,-1,0,"normal").resetToPose=!1))},_updateAim:function(){if(this._mouseDown_&&0!==this._aimDir){this._faceDir=this._target.x>this.node.x?1:-1,this.node.scaleX*this._faceDir<0&&(this.node.scaleX*=-1,this._moveDir&&this._updateAnimation());var t=this._armature.getBone("chest").global.y*this.node.scaleY;this._faceDir>0?this._aimRadian=Math.atan2(this._target.y-this.node.y-t,this._target.x-this.node.x):(this._aimRadian=Math.PI-Math.atan2(this._target.y-this.node.y-t,this._target.x-this.node.x),this._aimRadian>Math.PI&&(this._aimRadian-=2*Math.PI));var e=0;e=this._aimRadian>0?1:-1,this._aimDir!=e&&(this._aimDir=e,this._aimDir>=0?this._aimState=this._armature.animation.fadeIn("aim_up",-1,-1,0,"aim"):this._aimState=this._armature.animation.fadeIn("aim_down",-1,-1,0,"aim"),this._aimState.resetToPose=!1),this._aimState.weight=Math.abs(this._aimRadian/Math.PI*2),this._armature.invalidUpdate()}},_updateAttack:function(){this._isAttackingA&&!this._isAttackingB&&(this._isAttackingB=!0,this._attackState=this._armature.animation.fadeIn("attack_01",-1,-1,0,"attack",dragonBones.AnimationFadeOutMode.SameGroup),this._attackState.resetToPose=!1,this._attackState.autoFadeOutTime=this._attackState.fadeTotalTime)}});var o=cc.Class({name:"DragonBullet",_speedX:0,_speedY:0,_armature:null,_armatureDisplay:null,_effect:null,init:function(t,e,i,a,n,s){this._speedX=Math.cos(a)*n,this._speedY=Math.sin(a)*n;var o=t.convertToNodeSpaceAR(s);e.playAnimation("idle");var r=e.node;if(r.setPosition(o),r.angle=a*cc.macro.DEG,this._armature=e,i){this._effect=i;var c=this._effect.node;c.angle=a*cc.macro.DEG,c.setPosition(o),c.scaleX=1+1*Math.random(),c.scaleY=1+.5*Math.random(),Math.random()<.5&&(c.scaleY*=-1),this._effect.playAnimation("idle"),t.addChild(c)}t.addChild(r)},update:function(){var t=this._armature.node;t.x+=this._speedX,t.y+=this._speedY;var e=t.parent.convertToWorldSpaceAR(t.getPosition());return(e.x<-100||e.x>=cc.visibleRect.width+100||e.y<-100||e.y>=cc.visibleRect.height+100)&&(this.doClean(),!0)},onDisable:function(){this.doClean()},doClean:function(){this._armature.node.removeFromParent(),this._effect&&this._effect.node.removeFromParent()}})}cc._RF.pop()},{}],HelloWorld:[function(t,e,i){"use strict";cc._RF.push(e,"280c3rsZJJKnZ9RqbALVwtK","HelloWorld"),cc.Class({extends:cc.Component,properties:{text:"hints",label:{default:null,type:cc.Label},texture:{default:null,type:cc.Texture2D},spriteFrame:{default:null,type:cc.SpriteFrame},sprt:{default:null,type:cc.Sprite},_sprite:null},onLoad:function(){var t=this.spriteFrame,e=this.texture;this._sprite=this.getComponent(cc.Sprite),this._sprite.spriteFrame=t,this._sprite.spriteFrame.setTexture(e),this.sprt.spriteFrame=t,cc.log("sprite is "+this.spriteFrame+"lable is ")},start:function(){}}),cc._RF.pop()},{}],player:[function(t,e,i){"use strict";var a;function n(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}cc._RF.push(e,"f31663nx5tCeJV9f0k4oHSS","player"),cc.Class({extends:cc.Component,properties:(a={headSprite:{type:cc.Sprite,default:null},localSprite:{type:cc.SpriteFrame,default:null},head1:{default:null,type:cc.Texture2D},head2:{default:null,type:cc.Texture2D},head3:{default:null,type:cc.Texture2D},head4:{default:null,type:cc.Texture2D},head5:{default:null,type:cc.Texture2D},head6:{default:null,type:cc.Texture2D},head7:{default:null,type:cc.Texture2D},event:{default:null,type:cc.Event},moveLength:0,moveDuration:0,defaultPos:new cc.v2,sizeX:0},n(a,"moveLength",50),n(a,"_armature",null),n(a,"_armatureDisplay",null),n(a,"_head",null),a),onLoad:function(){this._armatureDisplay=this.getComponent(dragonBones.ArmatureDisplay),this._armature=this._armatureDisplay.armature(),this.isEnabled=!0,this.defaultPos.x=0,this.defaultPos.y=this.node.y,this.sizeX=this.node.scaleX,this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_IN_COMPLETE,this._animationEventHandler,this),this._armatureDisplay.addEventListener(dragonBones.EventObject.FADE_OUT_COMPLETE,this._animationEventHandler,this),this._armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE,this._animationEventHandler,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this),this.switchChar(this.head5)},_animationEventHandler:function(t){t.type===dragonBones.EventObject.COMPLETE&&"fire"===t.animationState.name&&(this._armature.animation.fadeIn("idle",.1,0,1).resetToPose=!0)},move:function(t){var e=cc.moveTo(this.moveDuration,cc.v2(this.defaultPos.x+t*this.moveLength,this.defaultPos.y)).easing(cc.easeCubicActionOut());return this.node.scaleX=t*this.sizeX,this._armature.animation.play("fire",1),cc.log("button event"),this.node.runAction(e)},switchChar:function(t){this.headSprite.spriteFrame.setTexture(t)},onKeyDown:function(t){switch(t.keyCode){case cc.macro.KEY.left:1==this.isEnabled&&(cc.log("a"),this.move(1),this.isEnabled=!1);break;case cc.macro.KEY.right:1==this.isEnabled&&(cc.log("d"),this.move(-1),this.isEnabled=!1,this.switchChar(this.head1));break;case cc.macro.KEY.f:this.switchChar(this.head1),cc.log("f is pressed")}},onKeyUp:function(t){switch(t.keyCode){case cc.macro.KEY.left:cc.log("a up"),this.isEnabled=!0;break;case cc.macro.KEY.right:cc.log("d up"),this.isEnabled=!0;break;case cc.macro.KEY.f:cc.log("f is up")}},start:function(){},update:function(t){}}),cc._RF.pop()},{}],spriteChange:[function(t,e,i){"use strict";cc._RF.push(e,"254fau3u+tOGrx42TMFxNjN","spriteChange"),cc.Class({extends:cc.Component,properties:{},start:function(){}}),cc._RF.pop()},{}],"use_v2.1-2.2.1_cc.Toggle_event":[function(t,e,i){"use strict";cc._RF.push(e,"70b53Xx7PFKnrg5A3B4jQor","use_v2.1-2.2.1_cc.Toggle_event"),cc.Toggle&&(cc.Toggle._triggerEventInScript_isChecked=!0),cc._RF.pop()},{}]},{},["DragonBonesCtrl","HelloWorld","player","spriteChange","use_v2.1-2.2.1_cc.Toggle_event"]);