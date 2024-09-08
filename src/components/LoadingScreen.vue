<template>
  <div class="main-loader">
    <div className="loader-wrapper">
      <div class="loader"></div>
    </div>
  </div>
</template>

<style scoped>
.main-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
  width: inherit;
}
.loader-wrapper {
  position: relative;
  z-index: 1;
}
.loader {
  width: 35px;
  height: 80px;
  position: relative;
}
.loader:after {
  content: "";
  position: absolute;
  inset: 0;
  padding: 3px 5px;
  border-top: 1px solid #d9f0ff;
  border-bottom: 4px solid #68c5d2;
  background: 
    linear-gradient(#fd9800 0 0) bottom no-repeat content-box, 
    #c5f6fb;
  mix-blend-mode: darken;
  animation: l1 1.5s infinite linear;
}
.loader:before {
  content: "";
  position: absolute;
  inset: -18px calc(50% - 2px) 8px;
  background: #eb6b3e;   
  transform-origin: bottom;
  transform: rotate(8deg);
}
@keyframes l1 {
 0%   {background-size: 100% 100%}
 100% {background-size: 100% 5%}
}
</style>
