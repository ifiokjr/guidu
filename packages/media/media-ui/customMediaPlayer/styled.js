import * as tslib_1 from "tslib";
import styled from 'styled-components';
import { colors } from '@uidu/theme';
export var CustomVideoWrapper = styled.div(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  user-select: none;\n"], ["\n  width: 100%;\n  height: 100%;\n  user-select: none;\n"])));
export var VideoWrapper = styled.div(templateObject_2 || (templateObject_2 = tslib_1.__makeTemplateObject(["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n"], ["\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n"])));
export var TimebarWrapper = styled.div(templateObject_3 || (templateObject_3 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  color: white;\n  position: absolute;\n  width: 100%;\n  bottom: 10px;\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  color: white;\n  position: absolute;\n  width: 100%;\n  bottom: 10px;\n"])));
export var VolumeWrapper = styled.div(templateObject_4 || (templateObject_4 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  width: 35px;\n  overflow: hidden;\n  transition: width 0.3s;\n  align-items: center;\n\n  &:hover,\n  &:active {\n    width: 155px;\n    transition: width 0.3s ease-out;\n  }\n"], ["\n  display: flex;\n  width: 35px;\n  overflow: hidden;\n  transition: width 0.3s;\n  align-items: center;\n\n  &:hover,\n  &:active {\n    width: 155px;\n    transition: width 0.3s ease-out;\n  }\n"])));
export var TimeWrapper = styled.div(templateObject_5 || (templateObject_5 = tslib_1.__makeTemplateObject(["\n  margin: 0 20px 10px 20px;\n  margin-bottom: 44px;\n"], ["\n  margin: 0 20px 10px 20px;\n  margin-bottom: 44px;\n"])));
export var CurrentTime = styled.div(templateObject_6 || (templateObject_6 = tslib_1.__makeTemplateObject(["\n  color: #a4b4cb;\n  user-select: none;\n  margin-right: 10px;\n"], ["\n  color: #a4b4cb;\n  user-select: none;\n  margin-right: 10px;\n"])));
export var TimeLine = styled.div(templateObject_7 || (templateObject_7 = tslib_1.__makeTemplateObject(["\n  width: 100%;\n  height: 2px;\n  transition-delay: 1s;\n  transition: all 0.1s;\n  background-color: #5d646f;\n  border-radius: 5px;\n  position: relative;\n"], ["\n  width: 100%;\n  height: 2px;\n  transition-delay: 1s;\n  transition: all 0.1s;\n  background-color: #5d646f;\n  border-radius: 5px;\n  position: relative;\n"])));
export var CurrentTimeLine = styled.div(templateObject_8 || (templateObject_8 = tslib_1.__makeTemplateObject(["\n  background-color: #3383ff;\n  border-radius: inherit;\n  height: inherit;\n  position: absolute;\n  top: 0;\n  max-width: 100%;\n"], ["\n  background-color: #3383ff;\n  border-radius: inherit;\n  height: inherit;\n  position: absolute;\n  top: 0;\n  max-width: 100%;\n"])));
export var Thumb = styled.div(templateObject_9 || (templateObject_9 = tslib_1.__makeTemplateObject(["\n  pointer-events: none;\n  width: 14px;\n  height: 14px;\n  border-radius: 100%;\n  background-color: white;\n  border: 1px solid #666;\n  position: absolute;\n  right: 0;\n  top: 50%;\n\n  transform: translate(7px, -50%) scale(0);\n  transition: all 0.1s;\n  transition-delay: 1s;\n\n  &:hover .current-time-tooltip {\n    opacity: 1;\n  }\n"], ["\n  pointer-events: none;\n  width: 14px;\n  height: 14px;\n  border-radius: 100%;\n  background-color: white;\n  border: 1px solid #666;\n  position: absolute;\n  right: 0;\n  top: 50%;\n\n  transform: translate(7px, -50%) scale(0);\n  transition: all 0.1s;\n  transition-delay: 1s;\n\n  &:hover .current-time-tooltip {\n    opacity: 1;\n  }\n"])));
export var BufferedTime = styled.div(templateObject_10 || (templateObject_10 = tslib_1.__makeTemplateObject(["\n  background-color: #aeb1b7;\n  height: inherit;\n  border-radius: inherit;\n  width: 0;\n"], ["\n  background-color: #aeb1b7;\n  height: inherit;\n  border-radius: inherit;\n  width: 0;\n"])));
export var LeftControls = styled.div(templateObject_11 || (templateObject_11 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  margin-left: 10px;\n"], ["\n  display: flex;\n  margin-left: 10px;\n"])));
export var RightControls = styled.div(templateObject_12 || (templateObject_12 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  margin-right: 10px;\n"], ["\n  display: flex;\n  align-items: center;\n  margin-right: 10px;\n"])));
export var ControlsWrapper = styled.div(templateObject_13 || (templateObject_13 = tslib_1.__makeTemplateObject(["\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: auto;\n  background: linear-gradient(to top, #0e1624, rgba(14, 22, 36, 0));\n  position: absolute;\n"], ["\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: auto;\n  background: linear-gradient(to top, #0e1624, rgba(14, 22, 36, 0));\n  position: absolute;\n"])));
export var VolumeToggleWrapper = styled.div(templateObject_14 || (templateObject_14 = tslib_1.__makeTemplateObject(["\n  position: relative;\n  margin-right: 13px;\n\n  button {\n    width: 36px;\n    color: ", ";\n  }\n"], ["\n  position: relative;\n  margin-right: 13px;\n\n  button {\n    width: 36px;\n    color: ",
    ";\n  }\n"])), function (_a) {
    var isMuted = _a.isMuted;
    return isMuted ? colors.R300 + " !important;" : '';
});
export var VolumeTimeRangeWrapper = styled.div(templateObject_15 || (templateObject_15 = tslib_1.__makeTemplateObject(["\n  width: 100%;\n  margin-right: 20px;\n"], ["\n  width: 100%;\n  margin-right: 20px;\n"])));
export var MutedIndicator = styled.div(templateObject_16 || (templateObject_16 = tslib_1.__makeTemplateObject(["\n  width: 29px;\n  height: 2px;\n  position: absolute;\n  top: 5px;\n  left: 9px;\n  background: ", ";\n  transform: rotate(32deg) translateY(10px);\n  opacity: 0;\n  pointer-events: none;\n\n  ", ";\n"], ["\n  width: 29px;\n  height: 2px;\n  position: absolute;\n  top: 5px;\n  left: 9px;\n  background: ", ";\n  transform: rotate(32deg) translateY(10px);\n  opacity: 0;\n  pointer-events: none;\n\n  ",
    ";\n"])), colors.R300, function (props) {
    return props.isMuted
        ? "\n    opacity: 1;\n  "
        : '';
});
export var CurrentTimeTooltip = styled.div(templateObject_17 || (templateObject_17 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  user-select: none;\n  top: -28px;\n  background-color: #182c4c;\n  color: #eff1f3;\n  font-size: 12px;\n  padding: 3px 7px;\n  border-radius: 3px;\n  left: 50%;\n  transform: translateX(-50%);\n  opacity: ", ";\n  transition: opacity 0.3s;\n"], ["\n  position: absolute;\n  user-select: none;\n  top: -28px;\n  background-color: #182c4c;\n  color: #eff1f3;\n  font-size: 12px;\n  padding: 3px 7px;\n  border-radius: 3px;\n  left: 50%;\n  transform: translateX(-50%);\n  opacity: ",
    ";\n  transition: opacity 0.3s;\n"])), function (props) {
    return props.isDragging ? '1' : '0';
});
export var TimeRangeWrapper = styled.div(templateObject_18 || (templateObject_18 = tslib_1.__makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  height: 22px;\n\n  cursor: pointer;\n  width: 100%;\n\n  &:hover ", " {\n    height: 4px;\n    transition: all 0.1s;\n  }\n\n  &:hover ", " {\n    transition: all 0.1s;\n    transform: translate(7px, -50%) scale(1);\n  }\n\n  ", " {\n    transition-delay: 1s;\n    ", "\n  }\n  ", " {\n    ", "\n  }\n"], ["\n  display: flex;\n  align-items: center;\n  height: 22px;\n\n  cursor: pointer;\n  width: 100%;\n\n  &:hover ", " {\n    height: 4px;\n    transition: all 0.1s;\n  }\n\n  &:hover ", " {\n    transition: all 0.1s;\n    transform: translate(7px, -50%) scale(1);\n  }\n\n  ", " {\n    transition-delay: 1s;\n    ",
    "\n  }\n  ", " {\n    ",
    "\n  }\n"])), TimeLine, Thumb, TimeLine, function (_a) {
    var showAsActive = _a.showAsActive;
    return showAsActive ? 'height: 4px;' : '';
}, Thumb, function (_a) {
    var showAsActive = _a.showAsActive;
    return showAsActive ? 'transform: translate(7px, -50%) scale(1);' : '';
});
export var SpinnerWrapper = styled.div(templateObject_19 || (templateObject_19 = tslib_1.__makeTemplateObject(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n"], ["\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19;
//# sourceMappingURL=styled.js.map