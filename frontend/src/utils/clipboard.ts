export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    alert('복사되었습니다.');
  } catch (error) {
    alert('복사에 실패했습니다.');
  }
};
