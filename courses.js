const list = document.getElementById('courseList');

// 서버에서 과목 목록 + 신청자 정보 불러오기
async function loadCourses() {
  try {
    const response = await fetch("http://3.36.119.153:8080/course");
    const courses = await response.json();

    courses.forEach(course => {
      const li = document.createElement('li');

      // 신청자 목록 생성
      const students = course.students && course.students.length > 0
        ? course.students.map(s => s.id).join(', ')
        : "아직 신청자 없음";

      li.innerHTML = `
        <strong>${course.name}</strong> (${course.professor})<br>
        <em>신청자:</em> ${students}<br>
        <button onclick="apply('${course.name}')">신청</button>
        <hr>
      `;

      list.appendChild(li);
    });
  } catch (err) {
    alert("서버에서 과목 목록을 불러오지 못했습니다.");
    console.error(err);
  }
}

// 수강 신청 함수
window.apply = async function(courseName) {
  const userId = localStorage.getItem("username");

  if (!userId) {
    alert("로그인 정보가 없습니다. 다시 로그인 해주세요.");
    return;
  }

  console.log("신청 요청 보냄 → userId:", userId, "courseName:", courseName);

  try {
    const response = await fetch("http://3.36.119.153:8080/course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        courseName: courseName,
        userId: userId
      })
    });

    const result = await response.json();

    if (response.ok) {
      alert(`신청 성공: ${result.message}`);
      location.reload();  // 새로고침하여 신청자 목록 업데이트
    } else {
      alert(`신청 실패: ${result.message}`);
    }
  } catch (err) {
    alert("서버 요청 실패");
    console.error(err);
  }
};

// 페이지 로드 시 실행
loadCourses();
