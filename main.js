const CardTask = (props) => {
  const className = props.title.split(" ").join("");
  return `
<div class="container-card-task">
<div class="card-task b-r ${className}">
    <div class="card-task-info b-r ">
     
        <span class="task-name">${props.title}</span>
       <div class="container-opt">
      <img src="./images/icon-ellipsis.svg" alt="">
       </div>
        <span class="task-time">${props.current}hrs</span>   
        <span class="task-previous">Last week - ${props.previous}hrs</span>                 
    </div>
</div>
</div>
`;
};

const options = [
  {
    label: "Daily",
    isActive: false,
    value: "daily",
  },
  {
    label: "Weekly",
    isActive: true,
    value: "weekly",
  },
  {
    label: "Monthly",
    isActive: false,
    value: "monthly",
  },
];

const CardUser = (props) => {
  let components = "";

  props.forEach((element) => {
    components += `
    <span class="${element.isActive && "is-active"}" id="${element.value}">${
      element.label
    }</span>
    `;
  });
  return `
    <div class="container-card-user">
    <div class="card-user b-r">
        <div class="card-user-profile b-r">
            <img class="card-user-profile-img" src="./images/image-jeremy.png" alt="profile">
            <div class="card-user-profile-name">
                <span>Report for</span>
                <h4>Jeremy Robson</h4>
            </div>
        </div>
        <div class="card-user-options">
           ${components}
        </div>
    </div>
    </div>
    `;
};

const App = function _Container() {
  let components = "";
  const opt = _Container.state.count.opt.find(
    (element) => element.isActive
  ).value;
  const user = CardUser(_Container.state.count.opt);
  if (_Container.state.data) {
    _Container.state.data.forEach((element) => {
      components += CardTask({
        title: element.title.toLowerCase(),
        current: element.timeframes[opt].current,
        previous: element.timeframes[opt].previous,
      });
    });
    return user + components;
  }
};
App.state = {
  count: {
    opt: options,
    data: [],
  },
  setData: (data) => {
    setState(() => (App.state.data = data));
  },
  setOpt: (opt) => {
      
    setState(
      () =>
        (App.state.count.opt = App.state.count.opt.map((element) => {
          return element.value === opt
            ? { ...element, isActive: true }
            : { ...element, isActive: false };
        }))
    );
  },
};

const setState = (callback) => {
  callback();
    updateTree();
  // extracted function
};

const fetchData = () => {
  fetch(
    "https://gist.githubusercontent.com/Pamsho09/1dc73ab3234ec17ac0211800638f017c/raw/3019259abaf2fc96c7d9d5e8e22f4115b7df5083/gistfile1.txt"
  )
    .then((response) => response.json())
    .then((data) => {
      App.state.setData(data);
      updateTree();
    });
};
const updateTree = () => {
  document.getElementById("app").innerHTML = App();
  const dailyBtn = document.getElementById("daily");
  const weeklyBtn = document.getElementById("weekly");
  const monthlyBtn = document.getElementById("monthly");
  dailyBtn && dailyBtn.addEventListener("click", daily);
  weeklyBtn && weeklyBtn.addEventListener("click", weekly);
  monthlyBtn && monthlyBtn.addEventListener("click", monthly);
};
fetchData();

const daily = () => {
  App.state.setOpt("daily");
  App();
};
const weekly = () => {
  App.state.setOpt("weekly");
  App();
};
const monthly = () => {
  App.state.setOpt("monthly");
  App();
};
