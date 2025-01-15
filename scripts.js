// 这里可以添加交互功能，如导航栏的下拉菜单、滑动效果等
document.addEventListener('DOMContentLoaded', () => {
  // 示例：按钮点击事件
  const buttons = document.querySelectorAll('.cta-button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      alert('按钮被点击了！');
    });
  });
});
