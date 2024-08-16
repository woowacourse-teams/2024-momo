export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    alert('복사에 실패했습니다.');
  }
};
