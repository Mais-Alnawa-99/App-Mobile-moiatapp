export abstract class constants {
  public static attachmentsKey = 'Attachments';
  public static declarationsKey = 'Declarations';
  public static createApplication = 'Create Application';
  public static createProfileApplication = 'Create Profile Application';
  public static maxFileSizeEngKey = 'File must smaller than {0} kb!';
  public static maxFileSizeArabKey = 'يجب أن يكون الملف أصغر من {0} كيلو بايت';
  public static allowedExtEngKey = 'You can upload only ';
  public static allowedExtArabKey = ' يمكنك تحميل فقط ';
  public static maxFilesEngKey = "You can't upload more than {0} files!";
  public static maxFilesArabKey = ' لا يمكنك تحميل أكثر من {0} الملفات ';
  public static dateErrorEng = 'End date should be greater than start date';
  public static dateErrorAra = 'يجب أن يكون تاريخ الانتهاء أكبر من تاريخ البدء';
  public static loginErrorEng = 'Please login first to create application!';
  public static loginErrorAra = 'الرجاء تسجيل الدخول أولا لإنشاء التطبيق!';
  public static permissionErrorEng =
    'Sorry, You have no permission to create the application with this service';
  public static permissionErrorAra =
    'عذرًا ، ليس لديك إذن بإنشاء التطبيق بهذه الخدمة';
  public static deleteConfirmationTextEng =
    'Are you sure you want to delete this?';
  public static deleteConfirmationTextAra = 'هل أنت متأكد أنك تريد حذف هذا';
  public static buttonYesTextEng = 'Yes';
  public static buttonYesTextAra = 'نعم';
  public static buttonCancelTextEng = 'Cancel';
  public static buttonCancelTextAra = 'إلغاء';
  public static attachmentNoteEng = 'Note';
  public static attachmentNoteAra = 'ملحوظة';
  public static UploadingTextEng = 'Uploading...';
  public static UploadingTextAra = 'تحميل ...';
  public static errorTextEng = 'Error';
  public static errorTextAra = 'خطأ';
  public static successTextEng = 'Success';
  public static successTextAra = 'نجاح';
  public static fillRequiredFieldsEng = 'Please fill all the required fields';
  public static fillRequiredFieldsAra = 'يرجى ملء جميع الحقول المطلوبة';
  public static maxAuthRepresentativesEngKey = "You can't add more than {0}";
  public static deleteAllConfirmationTextEng =
    'Are you sure you want to delete all?';
  public static deleteAllConfirmationTextAra =
    'هل أنت متأكد أنك تريد حذف الكل؟';
  public static guidErrorEng = 'Please provide valid GUID';
  public static guidErrorAra = 'الرجاء تقديم GUID صالح';
  public static noCertificateEng = 'There is no certificate to preview';
  public static noCertificateAra = 'لا توجد شهادة لمعاينتها';
  public static pleasecreateprofileErrorEng = 'Please create new profile';
  public static pleasecreateprofileErrorAra = 'الرجاء إنشاء ملف تعريف جديد';
  public static infoTextEng = 'Info';
  public static infoTextAra = 'معلومات';
  public static failFileuploadEng =
    'The upload was interrupted by a network failure or server error, Do you want to retry?';
  public static failFileuploadAra =
    'تمت مقاطعة التحميل بسبب فشل في الشبكة أو خطأ في الخادم ، هل تريد إعادة المحاولة؟';

  public static dateFilterTypeEng = 'Select date filter type';
  public static nopermissionTextEng =
    'Access denied! You do not have permission to access this.';
  public static nopermissionTextAra = 'تم الرفض! ليس لديك إذن للوصول إلى هذا.';

  public static actionCommentRequiredEng =
    'Please enter comment it is required';
  public static actionCommentRequiredAra = 'الرجاء إدخال التعليق المطلوب';

  public static markFavouriteEng = 'Marked as favourite successfully';
  public static markFavouriteAra = 'تم وضع علامة على المفضلة بنجاح';

  public static markUnfavouriteEng = 'Marked as unfavourite successfully';
  public static markfavouriteAra = 'تم وضع علامة على المفضلة بنجاح';
  public static DaysEng = 'Days';
  public static DaysAra = 'Days';
  public static HoursEng = 'Hours';
  public static HoursAra = 'Hours';
  public static MinutesEng = 'Minutes';
  public static MinutesAra = 'Minutes';
  public static itemAddedToCartEng = 'Item added to cart!';
  public static itemAddedToCartAra = 'Item added to cart!';
  public static itemAlreadyAddedToCartEng = 'Item already added to cart';
  public static itemAlreadyAddedToCartAra = 'Item already added to cart';
  public static SessionWillExpire =
    'You will be logged out in {0} seconds due to inactivity. If you wish to continue this session please click on Renew';
}
//Form Mode
export abstract class constantsFormMode {
  public static pending = 1;
  public static completed = 2;
}
//Application and tasks
export abstract class applicationsMode {
  public static myApplication = 'MyApplications';
  public static otherApplications = 'OtherApplications';
  public static myTasks = 'MyTasks';
  public static assignedToMe = 'AssignedToMe';
}

export enum FieldTypeEnum {
  Text = 1,
  Integer = 2,
  Date = 3,
  MultiSelect = 4,
  Options = 5,
  Information = 6,
  Relation = 7,
  Boolean = 8,
  User = 9,
  DateTime = 10,
  TermsCondition = 11,
  Location = 12,
  BigText = 13,
  Warning = 14,
  CalculatedField = 15,
  HTML = 16,
  ManualPayments = 17,
  TreeOptions = 18,
}

// User = 9,
// DateTime = 10,
// CalculatedField = 15,
// ManualPayments = 17,
// TreeOptions = 18,

//Stage action type
export abstract class StageActionType {
  public static save = 1;
  public static submit = 2;
  public static pay = 3;
  public static approve = 4;
  public static reject = 5;
  public static return = 6;
  public static previewCertificate = 7;
  public static assign = 8;
  public static delete = 9;
  public static timer = 10;
  public static notes = 11;
  public static assignToTeam = 12;
  public static reOpen = 13;
  public static downloadAction = 14;
  public static sendEmail = 15;
  public static ReAssign = 16;
}
export enum CustomServicesConstant {
  ILCensusSevice = 1109,
  MiteForumService = 1120,
  CustomerSupportService = 1122,
  UAECTEForumService = 1123,
  ICVDayService = 1148,
}

export enum ConstraintTypeEnum {
  Required = 1,
  HideForValues = 2,
  CascadingLoad = 3,
  VisibleByValue = 4,
  Expression = 5,
  ArabicLetters = 6,
  EnglishLetters = 7,
  Mobile = 8,
  Landline = 9,
  VisibleByExpression = 10,
  GreaterThan = 11,
  Email = 13,
  LessThanOrEqual = 14,
  DisableByValue = 15,
  LocalLandline = 16,
  LocalMobile = 17,
  EmiratesID = 18,
  Digits = 19,
  ClientSideCascading = 20,
  CustomValidator = 21,
  VisibleByRole = 22,
  MatchValue = 23,
  SendEmail = 24,
  DateGreaterThan = 25,
  IndustrialLicenseNumber = 26,
  InternationalNumber = 27,
  TextandNumbers = 28,
}

export enum FileConstraintTypeEnum {
  Required = 1,
  MaxSize = 2,
  MaxFiles = 3,
  AllowedExtensions = 4,
  VisibleByValue = 5,
  VisibleByExpression = 6,
  HideForValues = 7,
  VisibleByRole = 8,
}
