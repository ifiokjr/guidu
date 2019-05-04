import { replaceImports } from 'codesandboxer';
const regexString = /((?:import|export)\s*['"\`])(..\/src\/index.less)(['"\`]\s*)/;

export default function replaceSrc(content, name) {
  let replacedCode = content;
  if (name === '@uidu/css-reset') {
    replacedCode = replacedCode.replace(regexString, `$1${name}$3`);
  }

  if (name) {
    replacedCode = replaceImports(
      replacedCode.default ? replacedCode.default : replacedCode,
      [['../src', name]],
    );
  }
  return replacedCode;
}
