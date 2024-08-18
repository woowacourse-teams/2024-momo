export const copyToClipboard = async (text: string, callback: () => void) => {
  try {
    await navigator.clipboard.writeText(text);
    callback();
  } catch (error) {
    alert('복사에 실패했습니다.');
  }
};
