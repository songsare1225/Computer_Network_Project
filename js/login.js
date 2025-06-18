const form = document.getElementById("loginForm");

form.addEventListener("submit", async function(event) {
  event.preventDefault(); // 폼 제출로 인한 새로고침 방지

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://3.36.119.153:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: username,
        pw: password
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert(`로그인 성공: ${data.message}`);

      // 로그인한 사용자 ID를 localStorage에 저장
      localStorage.setItem("username", username);  // 또는 data.id 가 더 명확하면 data.id

      // 다음 페이지로 이동
      location.href = "courses.html";
    } else {
      alert(`로그인 실패: ${data.message}`);
    }
  } catch (err) {
    alert("서버 요청 실패");
    console.error(err);
  }
});
