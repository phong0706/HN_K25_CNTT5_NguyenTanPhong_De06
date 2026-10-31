let athletes = [
  { athleteCode: "ATH-001", fullName: "Lâm Văn Hải", sport: "Bóng Đá", age: 21, jerseyNumber: 10 },
  { athleteCode: "ATH-002", fullName: "Tạ Minh Thư", sport: "Bóng Chuyền", age: 19, jerseyNumber: 7 },
  { athleteCode: "ATH-003", fullName: "Đinh Công Phát", sport: "Bóng Đá", age: 24, jerseyNumber: 9 }
];

function validateAthleteCode(code) {
  if (code === null) return "";
  const trimmed = code.trim();
  if (trimmed === "") {
    return "Mã vận động viên không được rỗng.";
  }
  if (trimmed.length < 6) {
    return "Mã vận động viên phải tối thiểu 6 ký tự.";
  }
  if (!trimmed.toUpperCase().startsWith("ATH-")) {
    return "Mã vận động viên phải bắt đầu bằng 'ATH-'.";
  }
  if (/\s/.test(trimmed)) {
    return "Mã vận động viên không được chứa khoảng trắng.";
  }
  return "";
}

function findAthleteIndex(code) {
  if (code === null) return -1;
  const targetCode = code.trim().toUpperCase();
  return athletes.findIndex(a => a.athleteCode.toUpperCase() === targetCode);
}

function normalizeText(rawText) {
  if (rawText === null) return "";
  const words = rawText.trim().replace(/\s+/g, ' ').split(' ');
  if (words.length === 1 && words[0] === '') return '';
  return words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

function inputIntegerInRange(message, min, max) {
  while (true) {
    const input = prompt(message);
    if (input === null) {
      return null;
    }
    const trimmed = input.trim();
    if (trimmed === "") {
      alert("Giá trị nhập vào không được để trống!");
      continue;
    }
    const num = Number(trimmed);
    if (Number.isInteger(num) && num >= min && num <= max) {
      return num;
    }
    alert(`Lỗi: Vui lòng nhập một số nguyên trong khoảng từ ${min} đến ${max}!`);
  }
}

function displayAthletes(list) {
  if (list.length === 0) {
    console.log("Danh sách rỗng; in \"Danh sách vận động viên trống\".");
    return;
  }
  list.forEach((athlete, index) => {
    console.log(`${index + 1}. ${athlete.athleteCode} - ${athlete.fullName} - ${athlete.sport}\n   Tuổi: ${athlete.age} | Số áo: ${athlete.jerseyNumber}`);
  });
  console.log(`Tổng: ${list.length} vận động viên`);
}

function handleShowAthletes() {
  console.clear();
  console.log("--- DANH SÁCH VẬN ĐỘNG VIÊN ---");
  displayAthletes(athletes);
}

function handleAddAthlete() {
  console.clear();
  console.log("--- THÊM VẬN ĐỘNG VIÊN MỚI ---");
  
  let code = "";
  while (true) {
    const rawCode = prompt("Nhập mã vận động viên (bắt đầu bằng ATH-, tối thiểu 6 ký tự):");
    if (rawCode === null) {
      console.log("Hủy bỏ thao tác thêm vận động viên.");
      return;
    }
    const normCode = rawCode.trim().toUpperCase();
    const errorMsg = validateAthleteCode(normCode);
    if (errorMsg !== "") {
      alert("Lỗi: " + errorMsg);
      continue;
    }
    if (findAthleteIndex(normCode) !== -1) {
      alert("Lỗi: Mã vận động viên đã tồn tại trong danh sách!");
      continue;
    }
    code = normCode;
    break;
  }

  let fullName = "";
  while (true) {
    const rawName = prompt("Nhập họ tên vận động viên:");
    if (rawName === null) {
      console.log("Hủy bỏ thao tác thêm vận động viên.");
      return;
    }
    const normName = normalizeText(rawName);
    if (normName === "") {
      alert("Lỗi: Họ tên không được rỗng!");
      continue;
    }
    fullName = normName;
    break;
  }

  let sport = "";
  while (true) {
    const rawSport = prompt("Nhập môn thi đấu (ví dụ: Bóng Đá, Cầu Lông,...):");
    if (rawSport === null) {
      console.log("Hủy bỏ thao tác thêm vận động viên.");
      return;
    }
    const normSport = normalizeText(rawSport);
    if (normSport === "") {
      alert("Lỗi: Môn thi đấu không được rỗng!");
      continue;
    }
    sport = normSport;
    break;
  }

  const age = inputIntegerInRange("Nhập tuổi vận động viên (từ 15 đến 40):", 15, 40);
  if (age === null) {
    console.log("Hủy bỏ thao tác thêm vận động viên.");
    return;
  }

  const jerseyNumber = inputIntegerInRange("Nhập số áo (từ 1 đến 99):", 1, 99);
  if (jerseyNumber === null) {
    console.log("Hủy bỏ thao tác thêm vận động viên.");
    return;
  }

  const newAthlete = { athleteCode: code, fullName, sport, age, jerseyNumber };
  athletes.push(newAthlete);
  console.log("Thêm vận động viên thành công!");
  displayAthletes([newAthlete]);
}

function handleUpdateAthlete() {
  console.clear();
  console.log("--- CẬP NHẬT THÔNG TIN VẬN ĐỘNG VIÊN ---");
  const searchCode = prompt("Nhập mã vận động viên cần cập nhật:");
  if (searchCode === null) {
    console.log("Hủy bỏ thao tác cập nhật.");
    return;
  }
  const index = findAthleteIndex(searchCode);
  if (index === -1) {
    alert("Không tìm thấy vận động viên có mã vừa nhập!");
    return;
  }
  
  const current = athletes[index];
  console.log("Thông tin hiện tại:");
  displayAthletes([current]);

  let newName = current.fullName;
  const rawName = prompt("Nhập họ tên mới (Để trống nếu không muốn đổi):", current.fullName);
  if (rawName !== null && rawName.trim() !== "") {
    newName = normalizeText(rawName);
  }

  let newSport = current.sport;
  const rawSport = prompt("Nhập môn thi đấu mới (Để trống nếu không muốn đổi):", current.sport);
  if (rawSport !== null && rawSport.trim() !== "") {
    newSport = normalizeText(rawSport);
  }

  let newAge = current.age;
  const ageInput = prompt("Nhập tuổi mới (từ 15 đến 40, Để trống nếu không muốn đổi):", current.age.toString());
  if (ageInput !== null && ageInput.trim() !== "") {
    const ageNum = Number(ageInput.trim());
    if (Number.isInteger(ageNum) && ageNum >= 15 && ageNum <= 40) {
      newAge = ageNum;
    } else {
      alert("Giá trị tuổi không hợp lệ. Giữ nguyên tuổi cũ.");
    }
  }

  let newJersey = current.jerseyNumber;
  const jerseyInput = prompt("Nhập số áo mới (từ 1 đến 99, Để trống nếu không muốn đổi):", current.jerseyNumber.toString());
  if (jerseyInput !== null && jerseyInput.trim() !== "") {
    const jerseyNum = Number(jerseyInput.trim());
    if (Number.isInteger(jerseyNum) && jerseyNum >= 1 && jerseyNum <= 99) {
      newJersey = jerseyNum;
    } else {
      alert("Số áo không hợp lệ. Giữ nguyên số áo cũ.");
    }
  }

  athletes[index] = {
    ...current,
    fullName: newName,
    sport: newSport,
    age: newAge,
    jerseyNumber: newJersey
  };

  console.log("Cập nhật thông tin thành công!");
  displayAthletes([athletes[index]]);
}

function handleDeleteAthlete() {
  console.clear();
  console.log("--- XÓA VẬN ĐỘNG VIÊN ---");
  const searchCode = prompt("Nhập mã vận động viên cần xóa:");
  if (searchCode === null) {
    console.log("Hủy bỏ thao tác xóa.");
    return;
  }
  const index = findAthleteIndex(searchCode);
  if (index === -1) {
    alert("Không tìm thấy vận động viên cần xóa!");
    return;
  }

  const confirmDelete = confirm(`Bạn có chắc chắn muốn xóa vận động viên ${athletes[index].fullName} (Mã: ${athletes[index].athleteCode}) khỏi danh sách không?`);
  if (confirmDelete) {
    const deleted = athletes.splice(index, 1);
    console.log(`Đã xóa thành công vận động viên: ${deleted[0].fullName}`);
  } else {
    console.log("Hủy thao tác xóa.");
  }
}

function handleSearchAthletes() {
  console.clear();
  console.log("--- TÌM KIẾM VẬN ĐỘNG VIÊN THEO MÔN THI ĐẤU ---");
  const searchSport = prompt("Nhập môn thi đấu muốn tìm kiếm:");
  if (searchSport === null) {
    console.log("Hủy bỏ thao tác tìm kiếm.");
    return;
  }
  const normSearch = normalizeText(searchSport).toUpperCase();
  if (normSearch === "") {
    alert("Vui lòng nhập từ khóa môn thi đấu cần tìm!");
    return;
  }

  const results = athletes.filter(a => a.sport.toUpperCase().includes(normSearch));
  console.log(`Kết quả tìm kiếm cho môn: "${searchSport}"`);
  displayAthletes(results);
}

function runMenu() {
  const menuText = `HỆ THỐNG QUẢN LÝ VẬN ĐỘNG VIÊN CLB THỂ THAO VICTORY
=======================================
1. Hiển thị danh sách vận động viên
2. Thêm vận động viên mới
3. Cập nhật thông tin vận động viên
4. Xóa vận động viên
5. Tìm kiếm vận động viên theo môn thi đấu
0. Thoát chương trình
=======================================
Vui lòng nhập lựa chọn của bạn (0 - 5):`;

  while (true) {
    const choiceInput = prompt(menuText);
    if (choiceInput === null) {
      alert("Tạm biệt! Chương trình kết thúc.");
      break;
    }
    const choice = choiceInput.trim();
    if (choice === "1") {
      handleShowAthletes();
    } else if (choice === "2") {
      handleAddAthlete();
    } else if (choice === "3") {
      handleUpdateAthlete();
    } else if (choice === "4") {
      handleDeleteAthlete();
    } else if (choice === "5") {
      handleSearchAthletes();
    } else if (choice === "0") {
      alert("Cảm ơn bạn đã sử dụng hệ thống. Hẹn gặp lại!");
      break;
    } else {
      alert("Lỗi: Lựa chọn không hợp lệ (Phải là số từ 0 - 5)! Vui lòng thử lại.");
    }
  }
}

runMenu();