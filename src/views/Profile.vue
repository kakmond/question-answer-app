<template>
  <div class="text-center">
    <h1 class="text-danger font-weight-bold display-4">Mond</h1>
    <h4 class="font-weight-light text-muted">@mond</h4>
    <br />
    <ul class="nav-fill nav nav-tabs" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active"
          id="home-tab"
          data-toggle="tab"
          href="#home"
          role="tab"
          aria-controls="home"
          aria-selected="true"
        >Questions</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="profile-tab"
          data-toggle="tab"
          href="#profile"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
        >Answers</a>
      </li>
    </ul>
    <div class="tab-content">
      <div
        class="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >...</div>
      <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">...</div>
    </div>
  </div>
</template>
