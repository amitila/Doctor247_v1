import WebService from './WebService';

export default class APIService {
	static urlServerAddress = 'http://192.168.1.3:8080';

	static baseAPI = () => {
		return `${APIService.urlServerAddress}/api/`;
	};

	static apiCheckToken = () => {
		return `${APIService.baseAPI()}customer/users/check-token`;
	};

	static apiSignIn = () => {
		return `${APIService.baseAPI()}user/login`;
	};

	static apiSignUp = () => {
		return `${APIService.baseAPI()}user/customer`;
	};

	static apiProfile = () => {
		return `${APIService.baseAPI()}customer/users/profile`;
	};

	static apiAppointment = () => {
		return `${APIService.baseAPI()}customer/appointment`;
	};

	static apiAppointmentById = (id) => {
		return `${APIService.baseAPI()}customer/appointment/${id}`;
	};

	static apiProvinces = () => {
		return `${APIService.baseAPI()}province`;
	};

	static apiGuardian = () => {
		return `${APIService.baseAPI()}customer/guardian`;
	};

	static apiGuardianById = (id) => {
		return `${APIService.baseAPI()}customer/guardian/${id}`;
	};

	static apiQuestionMy = () => {
		return `${APIService.baseAPI()}customer/question/my`;
	};

	static apiQuestion = () => {
		return `${APIService.baseAPI()}customer/question`;
	};

	static apiQuestionById = (id) => {
		return `${APIService.baseAPI()}customer/question/${id}`;
	};

	// Save - Unsave question
	static apiQuestionSave = () => {
		return `${APIService.baseAPI()}customer/question/saved`;
	};

	static apiQuestionSaveById = (id) => {
		return `${APIService.baseAPI()}customer/question/${id}/save`;
	};

	static apiQuestionUnSaveById = (id) => {
		return `${APIService.baseAPI()}customer/question/${id}/unsave`;
	};

	// Like - Unlike question
	static apiQuestionLikeById = (id) => {
		return `${APIService.baseAPI()}customer/question/${id}/like`;
	};

	static apiQuestionUnLikeById = (id) => {
		return `${APIService.baseAPI()}customer/question/${id}/unlike`;
	};

	// Like - Unlike answer
	static apiAnswerById = (id) => {
		return `${APIService.baseAPI()}customer/answer/${id}`;
	};

	static apiAnswerLikeById = (id) => {
		return `${APIService.baseAPI()}customer/answer/${id}/like`;
	};

	static apiAnswerUnLikeById = (id) => {
		return `${APIService.baseAPI()}customer/answer/${id}/unlike`;
	};

	// DoctorList
	static apiDoctorList = () => {
		return `${APIService.baseAPI()}customer/doctor/list`;
	};

	static apiDoctorById = (id) => {
		return `${APIService.baseAPI()}customer/doctor/${id}`;
	};

  	// TODO: multipart

//====================CHECK-TOKEN AND SET NEW TOKEN======================

	// api for check-token
	static checkToken(token, callback) {
		WebService.sendJsonPOST(
			this.apiCheckToken(),
			{
				jwt : token,
				token
			},
			callback,
		);
	}
	  
//====================SIGNIGN======================
	// api for SignIn
	static signIn(email, password, callback) {
		WebService.sendJsonPOST(
			this.apiSignIn(),
			{
				email,
				password,
			},
			callback,
		);
	}

//====================PROFILE======================

	// api for Get Profile
	static getProfile(token, callback ) {
		WebService.sendJsonGET(
			this.apiProfile(),
			{
				jwt: token
			},
			callback,
		);
	}

	// api for Put Profile
	static putProfile(token, values, callback ) {
		const formData = new FormData();
		formData.append('firstName', values.firstName);
		formData.append('lastName', values.lastName);
		formData.append('gender', values.gender);
		formData.append('birthday', values.birthday);
		formData.append('avatar', values.avatar);
		formData.append('phoneNumber', values.phoneNumber);
		formData.append('provinceId', values.provinceId);
		formData.append('address', values.address);
		WebService.sendJsonPUT(
			this.apiProfile(),
			{
				jwt: token,
				formData
			},
			callback,
		);
	}

//====================SIGNUP======================

	// api for SignUp
	static signUp(values, callback) {
		const formData = new FormData();
		formData.append('email', values.email);
		formData.append('firstName', values.firstName);
		formData.append('lastName', values.lastName);
		formData.append('password', values.password);
		formData.append('phoneNumber', values.phoneNumber);
		formData.append('gender', values.gender);
		WebService.sendJsonPOST(
			this.apiSignUp(),
			{
				formData
			},
			callback,
		);
	}

//====================APPOINTMENT======================

	// api for Post Appointment Form
	static postAppointment(token, values, callback) {
		const formData = new FormData();
		formData.append('guardianId', values.guardianId);
		formData.append('doctorId', values.doctorId);
		formData.append('dayTime', values.dayTime);
		formData.append('description', values.description);
		values.images.forEach((image, index) => {
			formData.append(`images[${index}]`, image);
		  });
		WebService.sendJsonPOST(
			this.apiAppointment(),
			{
				jwt: token,
				formData
			},
			callback,
		);
	}

	// api for Get Appointment
	static getAppointment(token, values, callback) {
		const formData = new FormData();
		formData.append('status', values.status);
		formData.append('period', values.period);
		formData.append('day', values.day);
		formData.append('month', values.month);
		formData.append('year', values.year);
		WebService.sendJsonGET(
			this.apiAppointment(),
			{
				jwt: token,
				formData
			},
			callback,
		);
	}

	// api for Get an appoitment by id
	static getAppointmentById( token, id, callback ) {
		WebService.sendJsonGET(
			this.apiAppointmentById(id),
			{
				jwt: token,
			},
			callback,
		);
	}

	// api for Delete an appoitment by id
	static deleteAppointmentById( token, id, callback ) {
		WebService.sendJsonDELETE(
			this.apiAppointmentById(id),
			{
				jwt: token,
			},
			callback,
		);
	}

//====================PROVINCES======================

	// api for Get Provinces
	static getProvinces( callback ) {
		WebService.sendJsonGET(
			this.apiProvinces(),
			{
			},
			callback,
		);
	}

//====================GUARDIAN======================

	// api for Post Guardian
	static postGuardian(token, values, callback ) {
		const formData = new FormData();
		formData.append('guardianName', values.guardianName);
		formData.append('firstName', values.firstName);
		formData.append('lastName', values.lastName);
		formData.append('gender', values.gender);
		formData.append('birthday', values.birthday);
		formData.append('avatar', values.avatar);
		formData.append('phoneNumber', values.phoneNumber);
		formData.append('provinceId', values.provinceId);
		formData.append('address', values.address);
		WebService.sendJsonPOST(
			this.apiGuardian(),
			{
				jwt: token,
				formData
			},
			callback,
		);
	}

	// api for Get Guardian
	static getGuardian(token, callback ) {
		WebService.sendJsonGET(
			this.apiGuardian(),
			{
				jwt: token
			},
			callback,
		);
	}

	// api for Put a Guardian by id
	static putGuardianById( token, id, values, callback ) {
		const formData = new FormData();
		formData.append('guardianName', values.guardianName);
		formData.append('firstName', values.firstName);
		formData.append('lastName', values.lastName);
		formData.append('gender', values.gender);
		formData.append('birthday', values.birthday);
		formData.append('avatar', values.avatar);
		formData.append('phoneNumber', values.phoneNumber);
		formData.append('provinceId', values.provinceId);
		formData.append('address', values.address);
		WebService.sendJsonPUT(
			this.apiGuardianById(id),
			{
				jwt: token,
				formData
			},
			callback,
		);
	}

//====================QUESTION======================

	// api for Get Question My
	static getQuestionMy(token, callback ) {
		WebService.sendJsonGET(
			this.apiQuestionMy(),
			{
				jwt: token
			},
			callback,
		);
	}	

	// api for All Questions
	static getQuestion(token, callback ) {
		WebService.sendJsonGET(
			this.apiQuestion(),
			{
				jwt: token
			},
			callback,
		);
	}	

	// api for Post A Question
	static postQuestion(token, values, callback) {
		const formData = new FormData();
		formData.append('title', values.title);
		formData.append('content', values.content);
		values.images.forEach((image, index) => {
			formData.append(`images[${index}]`, image);
		});
		WebService.sendJsonPOST(
			this.apiQuestion(),
			{
				jwt: token,
				formData
			},
			callback,
		);
	}

	// api for Put Question By Id
	static putQuestionById(token, id, values, callback ) {
		const formData = new FormData();
		formData.append('title', values.title);
		formData.append('content', values.content);
		values.images?.forEach((image, index) => {
			formData.append(`images[${index}]`, image);
		});
		values.deleteImgs?.forEach((image, index) => {
			formData.append(`deleteImgs[${index}]`, image);
		});
		WebService.sendJsonPUT(
			this.apiQuestionById(id),
			{
				jwt: token,
				formData
			},
			callback,
		);
	}

//====================SAVE - UNSAVE QUESTION======================

	// api for Get Saved Question
	static getSavedQuestion(token, callback ) {
		WebService.sendJsonGET(
			this.apiQuestionSave(),
			{
				jwt: token
			},
			callback,
		);
	}	

	// api for Put Question Save By Id
	static putQuestionSaveById(token, id, callback ) {
		WebService.sendJsonPUT(
			this.apiQuestionSaveById(id),
			{
				jwt: token
			},
			callback,
		);
	}

	// api for Put Question UnSave By Id
	static putQuestionUnSaveById(token, id, callback ) {
		WebService.sendJsonDELETE(
			this.apiQuestionUnSaveById(id),
			{
				jwt: token
			},
			callback,
		);
	}

//====================LIKE - UNLIKE QUESTION======================

	// api for Put Question Like By Id
	static putQuestionLikeById(token, id, callback ) {
		WebService.sendJsonPUT(
			this.apiQuestionLikeById(id),
			{
				jwt: token
			},
			callback,
		);
	}

	// api for Put Question Like By Id
	static putQuestionUnLikeById(token, id, callback ) {
		WebService.sendJsonPUT(
			this.apiQuestionUnLikeById(id),
			{
				jwt: token
			},
			callback,
		);
	}

//====================LIKE - UNLIKE ANSWER======================

	// api for Get Answer By Id
	static getAnswerById(token, id, callback ) {
		WebService.sendJsonGET(
			this.apiAnswerById(id),
			{
				jwt: token
			},
			callback,
		);
	}	

	// api for Put Answer Like By Id
	static putAnswerLikeById(token, id, callback ) {
		WebService.sendJsonPUT(
			this.apiAnswerLikeById(id),
			{
				jwt: token
			},
			callback,
		);
	}

	// api for Put Answer Like By Id
	static putAnswerUnLikeById(token, id, callback ) {
		WebService.sendJsonPUT(
			this.apiAnswerUnLikeById(id),
			{
				jwt: token
			},
			callback,
		);
	}

//====================DOCTOR - LIST======================

	// api for Get Doctor List
	static getDoctorList(token, callback ) {
		WebService.sendJsonGET(
			this.apiDoctorList(),
			{
				jwt: token
			},
			callback,
		);
	}	

	// api for Get Doctor By Id
	static getDoctorById(token, id, callback ) {
		WebService.sendJsonGET(
			this.apiDoctorById(id),
			{
				jwt: token
			},
			callback,
		);
	}	

}
