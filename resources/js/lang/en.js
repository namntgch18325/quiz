export default {
  route: {
    dashboard: 'Dashboard',
    profile: 'Profile',
    classselector: 'Class Selector',
    surveyselector: 'Survey Selector',
    quizing: 'Quizing',
    listquiz: 'Quiz List',
    listsurvey: 'Survey List',
    user: 'User',
    settings: 'Settings',
    role: 'Role',
    media: 'Media',
    department: 'Department',
    class: 'Class',
    tag: 'Tag',
    introduction: 'Introduction',
    documentation: 'Documentation',
    guide: 'Guide',
    permission: 'Permission',
    pagePermission: 'Page Permission',
    rolePermission: 'Role Permission',
    directivePermission: 'Directives',
    icons: 'Icons',
    components: 'Components',
    componentIndex: 'Introduction',
    tinymce: 'Tinymce',
    markdown: 'Markdown',
    jsonEditor: 'JSON Editor',
    dndList: 'Dnd List',
    splitPane: 'SplitPane',
    avatarUpload: 'Avatar Upload',
    dropzone: 'Dropzone',
    sticky: 'Sticky',
    countTo: 'CountTo',
    componentMixin: 'Mixin',
    backToTop: 'BackToTop',
    dragDialog: 'Drag Dialog',
    dragSelect: 'Drag Select',
    dragKanban: 'Drag Kanban',
    charts: 'Charts',
    keyboardChart: 'Keyboard Chart',
    lineChart: 'Line Chart',
    mixChart: 'Mix Chart',
    example: 'Example',
    nested: 'Nested Routes',
    menu1: 'Menu 1',
    'menu1-1': 'Menu 1-1',
    'menu1-2': 'Menu 1-2',
    'menu1-2-1': 'Menu 1-2-1',
    'menu1-2-2': 'Menu 1-2-2',
    'menu1-3': 'Menu 1-3',
    menu2: 'Menu 2',
    table: 'Table',
    dynamicTable: 'Dynamic Table',
    dragTable: 'Drag Table',
    inlineEditTable: 'Inline Edit',
    complexTable: 'Complex Table',
    treeTable: 'Tree Table',
    customTreeTable: 'Custom TreeTable',
    tab: 'Tab',
    form: 'Form',
    createArticle: 'Create Article',
    editArticle: 'Edit Article',
    articleList: 'Articles',
    errorPages: 'Error Pages',
    page401: '401',
    page404: '404',
    errorLog: 'Error Log',
    excel: 'Excel',
    exportExcel: 'Export Excel',
    selectExcel: 'Export Selected',
    mergeHeader: 'Merge Header',
    uploadExcel: 'Upload Excel',
    zip: 'Zip',
    pdf: 'PDF',
    exportZip: 'Export Zip',
    theme: 'Theme',
    clipboardDemo: 'Clipboard',
    i18n: 'I18n',
    externalLink: 'External Link',
    elementUi: 'Element UI',
    administrator: 'Administrator',
    users: 'Users',
    userProfile: 'User Profile',
  },
  navbar: {
    logOut: 'Log Out',
    dashboard: 'Dashboard',
    github: 'Github',
    theme: 'Theme',
    size: 'Global Size',
    profile: 'Profile',
  },
  login: {
    title: 'Quick Survey',
    logIn: 'Log in',
    username: 'Username',
    password: 'Password',
    any: 'any',
    thirdparty: 'Or connect with',
    thirdpartyTips: 'Can not be simulated on local, so please combine you own business simulation! ! !',
    email: 'Email',
  },
  documentation: {
    documentation: 'Documentation',
    laravel: 'Laravel',
    github: 'Github Repository',
  },
  permission: {
    addRole: 'New Role',
    editPermission: 'Edit Permission',
    roles: 'Your roles',
    switchRoles: 'Switch roles',
    tips: 'In some cases it is not suitable to use v-role/v-permission, such as element Tab component or el-table-column and other asynchronous rendering dom cases which can only be achieved by manually setting the v-if with checkRole or/and checkPermission.',
    delete: 'Delete',
    confirm: 'Confirm',
    cancel: 'Cancel',
  },
  guide: {
    description: 'The guide page is useful for some people who entered the project for the first time. You can briefly introduce the features of the project. Demo is based on ',
    button: 'Show Guide',
  },
  components: {
    documentation: 'Documentation',
    tinymceTips: 'Rich text editor is a core part of management system, but at the same time is a place with lots of problems. In the process of selecting rich texts, I also walked a lot of detours. The common rich text editors in the market are basically used, and the finally chose Tinymce. See documentation for more detailed rich text editor comparisons and introductions.',
    dropzoneTips: 'Because my business has special needs, and has to upload images to qiniu, so instead of a third party, I chose encapsulate it by myself. It is very simple, you can see the detail code in @/components/Dropzone.',
    stickyTips: 'when the page is scrolled to the preset position will be sticky on the top.',
    backToTopTips1: 'When the page is scrolled to the specified position, the Back to Top button appears in the lower right corner',
    backToTopTips2: 'You can customize the style of the button, show / hide, height of appearance, height of the return. If you need a text prompt, you can use element-ui el-tooltip elements externally',
    imageUploadTips: 'Since I was using only the vue@1 version, and it is not compatible with mockjs at the moment, I modified it myself, and if you are going to use it, it is better to use official version.',
  },
  table: {
    description: 'Description',
    dynamicTips1: 'Fixed header, sorted by header order',
    dynamicTips2: 'Not fixed header, sorted by click order',
    dragTips1: 'The default order',
    dragTips2: 'The after dragging order',
    name: 'Name',
    title: 'Title',
    importance: 'Imp',
    type: 'Type',
    remark: 'Remark',
    search: 'Search',
    add: 'Add',
    export: 'Export',
    reviewer: 'reviewer',
    id: 'ID',
    date: 'Date',
    author: 'Author',
    readings: 'Readings',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    publish: 'Publish',
    draft: 'Draft',
    delete: 'Delete',
    cancel: 'Cancel',
    confirm: 'Confirm',
    keyword: 'Keyword',
    role: 'Role',
    col_title: 'Title',
    col_picture: 'Picture',
    col_option: 'Option',
    col_content: 'Content',
    col_showdetail: 'Show Detail',
    col_operations: 'Operations',
    col_hide: 'Display / Hide',
    col_department: 'Deparment',
    col_class: 'Class',
    col_listquiz: 'List Quiz',
    col_department_ja: 'Department (Japanese)',
    col_department_en: 'Department (English)',
    col_class_ja: 'Class (Japanese)',
    col_class_en: 'Class (Department)',
  },
  errorLog: {
    tips: 'Please click the bug icon in the upper right corner',
    description: 'Now the management system are basically the form of the spa, it enhances the user experience, but it also increases the possibility of page problems, a small negligence may lead to the entire page deadlock. Fortunately Vue provides a way to catch handling exceptions, where you can handle errors or report exceptions.',
    documentation: 'Document introduction',
  },
  excel: {
    export: 'Export',
    selectedExport: 'Export Selected Items',
    placeholder: 'Please enter the file name(default excel-list)',
  },
  zip: {
    export: 'Export',
    placeholder: 'Please enter the file name(default file)',
  },
  pdf: {
    tips: 'Here we use window.print() to implement the feature of downloading pdf.',
  },
  theme: {
    change: 'Change Theme',
    documentation: 'Theme documentation',
    tips: 'Tips: It is different from the theme-pick on the navbar is two different skinning methods, each with different application scenarios. Refer to the documentation for details.',
  },
  tagsView: {
    refresh: 'Refresh',
    close: 'Close',
    closeOthers: 'Close Others',
    closeAll: 'Close All',
  },
  settings: {
    title: 'Page style setting',
    theme: 'Theme Color',
    tagsView: 'Open Tags-View',
    fixedHeader: 'Fixed Header',
    sidebarLogo: 'Sidebar Logo',
  },
  user: {
    'role': 'Role',
    'password': 'Password',
    'confirmPassword': 'Confirm password',
    'name': 'Name',
    'email': 'Email',
  },
  roles: {
    description: {
      admin: 'Super Administrator. Have access and full permission to all pages.',
      manager: 'Manager. Have access and permission to most of pages except permission page.',
      editor: 'Editor. Have access to most of pages, full permission with articles and related resources.',
      user: 'Normal user. Have access to some pages',
      visitor: 'Visitor. Have access to static pages, should not have any writable permission',
    },
  },
  // Edit new
  button: {
    create: 'Create new',
    delete: 'Delete',
    options: 'Options',
    show: 'Show',
    save: 'Save',
    close: 'Close',
    quizzes: 'Quizzes',
  },
  placeholder: {
    search: 'Search',
    display: 'Display / Hide',
    department: 'Department',
    class: 'Class',
  },
  popup: {
    quiz: {
      titleCreate: 'Create quiz',
      titleEdit: 'Edit Quiz',
      tTitle: 'Title',
      tSentence: 'Sentence',
      tPicture: 'Pricture',
      tOptions: 'Options',
      tExCorrect: 'Explain Correct',
      tExIncorrect: 'Explain Incorrect',
      table: {
        Japanese: 'Japanese',
        English: 'English',
        Correct: 'Correct',
        Delete: 'Delete',
      },
      pEnterEnglish: 'Enter English',
      pEnterJapanese: 'Enter Japanese',
      delete: {
        title: 'Confirm Delete',
        content: 'Do you want to delete this ?',
        close: 'Close',
        Delete: 'Delete',
      },
      notify: {
        addSuccess: 'Congratulations, You have successfully created the quiz!',
        editSuccess: 'Congratulations, You have successfully edited the quiz!',
        deleteSuccess: 'Congratulations, You have successfully deleted!',
        notAnswer: 'Warning, You have not yet selected an answer!',
        notOption: 'Warning, You have not entered the option!',
        notInfor: 'Warning, You have not entered sufficient information!',
        deleteFailed: 'Warning, You deleted failed!',
        notchoseDelete: 'Warning, You have not selected the questions you want to delete!',
      },
      validate: {
        rtitle: 'Please enter Title',
        rsentence: 'Please enter Sentence',
        rexCorrect: 'Please enter Explain Correct',
        rexIncorrect: 'Please enter Explain Incorrect',
        ltitle: 'You can enter up to 255 characters',
        lsentence: 'You can enter up to 255 characters',
        lexCorrect: 'You can enter up to 255 characters',
        lexIncorrect: 'You can enter up to 255 characters',
      },
      button: {
        time: 'Time',
        alphabet: 'Alphabet',
      },
    },
    survey: {
      titleCreate: 'Create Survey',
      titleEdit: 'Edit Survey',
      tTitle: 'Title',
      tClass: 'Class',
      tDepartment: 'Department',
      tStatus: 'Status',
      pStatus: 'Active / Back Number',
      pchooseTag: 'Choose tags',
      tTag: 'Tags',
      tchoosequiz: 'Choose quiz',
      tLeftTransfer: 'All Quiz',
      tRightTransfer: 'Quiz Selected',
      tComplete: 'Complete message',
      tCorrectPic: 'Correct Picture',
      tIncorrectPic: 'Incorrect Picture',
      pEnterEnglish: 'Enter English',
      pEnterJapanese: 'Enter Japanese',
      display: {
        sDisplay: 'Display',
        sHide: 'Hide',
      },
      status: {
        sActions: 'Actions',
        sBack: 'Back',
      },
      notify: {
        addSuccess: 'Congratulations, you have successfully created Survey!',
        editSucees: 'Congratulations, you have successfully edited the Survey!',
        deleteSuccess: 'Congratulations, you have successfully deleted the Survey!',
        addFailed: 'Warning, You added a failed Survey!',
        editFailed: 'Warning, you have fixed the failed Survey!',
        deleteFailed: 'Warning, you have deleted the failed Survey!',
        notchoseDelete: 'Warning, you have not selected the Survey you want to delete!',
      },
      validate: {
        notInputIMG: 'Warning you have not added photos for Survey!',
        notInputTag: 'Warning you have not added a tag for Survey!',
        quizbigger5: 'Warning, You have selected more than 5 questions!',
        quizless5: 'Warning, You have selected less than 5 questions!',
        notInfor: 'Warning, You have not entered the full information of Survey!',
        rTitle: 'Please enter Title',
        rDisplay: 'Please enter Display',
        rClass: 'Please enter Class',
        rDepartment: 'Please enter Department',
        rStauts: 'Please enter Status',
        rComplete: 'Please enter Complete',
        lTitle: 'You can enter up to 255 characters',
        lComplete: 'You can enter up to 255 characters',
      },
      delete: {
        title: 'Confirm Delete',
        content: 'Do you want to delete this ?',
        close: 'Close',
        Delete: 'Delete',
      },
    },
    department: {
      tCreate: 'Create quiz',
      tEdit: 'Edit quiz',
      tDepartment_ja: 'Department name JA',
      tDepartment_en: 'Department nam EN',
      pDepartment_ja: 'Enter Department (Japanese)',
      pDepartment_en: 'Enter Department (English)',
      delete: {
        title: 'Confirm Delete Japanese',
        content: 'Do you want to delete this ? (Japanese)',
        close: 'Close Japanese',
        Delete: 'Delete Japanese',
      },
      rule: {
        rname: 'Please enter the Department',
        lname: 'You can enter up to 255 characters',
      },
      notify: {
        createSuccess: 'Congratulations, you have successfully created the Department!',
        createFailed: 'Warning, You have created a Department failed!',
        editSuccess: 'Congratulations, you have successfully repaired the Department!',
        editFailed: 'Warning, You have fixed the Department failed!',
        deleteSuccess: 'Congratulations, you have successfully deleted the Department',
        deleteFailed: 'Warning, You have deleted the Department failed!',
        notchoseDelete: 'Warning, You have not selected the Department you want to delete!',
      },
    },
    class: {
      tCreate: 'Create class',
      tEdit: 'Edit class',
      tClass_ja: 'Class name',
      tClass_en: 'Class name',
      pClass_ja: 'Enter Class (Japanese) Ja',
      pClass_en: 'Enter Class (English) En',
      delete: {
        title: 'Confirm Delete',
        content: 'Do you want to delete this ?',
        close: 'Close',
        Delete: 'Delete',
      },
      rule: {
        rname: 'Please enter the Class',
        lname: 'You can enter up to 255 characters',
      },
      notify: {
        createSuccess: 'Congratulations, you have successfully created the Class!',
        createFailed: 'Warning, You have created a Class failed!',
        editSuccess: 'Congratulations, you have successfully repaired the Class!',
        editFailed: 'Warning, You have fixed the Class failed!',
        deleteSuccess: 'Congratulations, you have successfully deleted the Class!',
        deleteFailed: 'Warning, You have deleted the Class failed!',
        notchoseDelete: 'Warning, You have not selected the Class you want to delete!',
      },
    },
    tag: {
      tCreate: 'Create tag',
      tEdit: 'Edit tag',
      tClass_ja: 'Tag name',
      tClass_en: 'Tag name',
      pClass_ja: 'Enter CTag (Japanese)',
      pClass_en: 'Enter Tag (English)',
      delete: {
        title: 'Confirm Delete',
        content: 'Do you want to delete this ?',
        close: 'Close',
        Delete: 'Delete',
      },
      rule: {
        rname: 'Please enter the Tag',
        lname: 'You can enter up to 255 characters',
      },
      notify: {
        createSuccess: 'Congratulations, you have successfully created the Tag!',
        createFailed: 'Warning, You have created a Tag failed!',
        editSuccess: 'Congratulations, you have successfully repaired the Tag!',
        editFailed: 'Warning, You have fixed the Tag failed!',
        deleteSuccess: 'Congratulations, you have successfully deleted the Tag!',
        deleteFailed: 'Warning, You have deleted the Tag failed!',
        notchoseDelete: 'Warning, You have not selected the Tag you want to delete!',
      },
    },
  },
  respondent: {
    dashboard: {
      tSelectLang: 'Select your language',
      btnJA: 'Japanese',
      btnEN: 'English',
      popup: {
        message: 'Sorry, an error occurred during execution!',
      },
    },
    selectClass: {
      title: 'Select your class',
      message: 'Class incorrectly selected!',
      popup: {
        title: 'Warning',
        message: 'You not select language!',
        back: 'Back',
      },
    },
    selectSurvey: {
      placeholder: {
        title: 'Search Title',
        department: 'Search Department',
        tag: 'Choose tags',
      },
      table: {
        col_title: 'Title',
        col_done: 'Done',
        col_start: 'Start',
      },
      button: {
        search: 'Search',
        title: 'Title',
        time: 'Time',
        finished: 'Finished',
        start: 'Start',
      },
      dialog: {
        title: 'Waring',
        content: 'You have not choose Class',
        wrong: 'Something is wrong',
        back: 'Back',
        wrongSurvey: 'Survey was incorrectly selected',
      },
    },
    quizing: {
      button: {
        back: 'Back',
        next: 'Next',
        backPage: 'Back',
        submit: 'Submit',
        close: 'Close',
        home: 'Home',
        time: 'Time',
        alphabet: 'Alphabet',
        goToNext: 'Go to Next',
        tryAgain: 'Try Again',
        doAgain: 'Take this survey again',
        toSurvey: 'Take another survey',
        toClass: 'Take anthor class',
      },
      dialog: {
        titlecheck: 'Warning',
        titleComplete: 'Complete',
        notClass: 'You have not choose Class',
        notSurvey: 'You have not choose Survey',
        notAnswer: 'You have not chosen an answer',
        exCorrect: 'Explain correct',
        exIncorrect: 'Explain incorrect',
      },
    },
  },
  profile: {
    account: 'Account',
    name: 'Name',
    email: 'Email',
    update: 'Update',
    role: 'Role',
    edit: 'Edit',
    delete: 'Delete',
    editUser: 'Edit User',
    changePassword: 'Change Password',
    password: 'Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmNewPassword: 'Confrim New Password',
    messPassMismatched: 'Password is mismatched!',
    messPassValLenght: 'Password must have more than 5 characters',
    messPassRequire: 'Password is required',
    messUpdateSuccess: 'User information has been updated successfully',
    messUpdateFail: 'Upload fail',
    uploadImg: 'Upload image',
    uploadAva: 'Upload Avatar',
    editAva: 'Edit avatar',
    cancel: 'Cancel',
    confirm: 'Confirm',
  },
  errorPage: {
    Oops: 'OOPS!',
    bullshit_info: 'Please check that the URL you entered is correct. Please click the button below to return to the homepage or send an error report.',
    bullshit_return_home: 'Back to home',
    noPermission: 'You don\'t have permission to go to this page',
    askAdmin: 'If you are dissatisfied, please contact admistrator.',
    routeUser: 'Or you can go:',
    lookAround: 'just looking around',
    showPic: 'show a picture',
    canNotGo: 'The bodyguard said that you can\'t enter this page...',

  },
  list: {
    popCreateMew: 'Creatr new user',
    placeHolderRole: 'Please select role',
    messEmailRequired: 'Email is required',
    messRoleRequired: 'Role is required',
    messNameRequired: 'Name is required',
    messPasswordRequired: 'Password is required',
    messInputCorrectE: 'Please input correct email address',
    admin: 'Admin',
    user: 'User',
    cfDelete: 'This will permanently delete user',
    sucDelete: 'Delete completed',
    cancelDelete: 'Delete canceled',
    messCfNewUserFont: 'New user ',
    messCfNewUserTail: ') has been created successfully.',
    messEditUser: 'User information has been updated successfully',
  },
  dashboard: {
    button: {
      clear: 'Clear Selected',
      export: 'Export',
    },
    placeholder: {
      chooseRespondent: 'Select Respondent',
      chooseSurvey: 'Select Survey',
      startDate: 'Start date',
      endDate: 'End date',
    },
    table: {
      colRespondent: 'Respondent',
      colSurvey: 'Survey',
      colFirstTime: 'First Time',
      colLastTime: 'Last Time',
    },
  },
};
