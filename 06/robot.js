Robot = function (x, y, z) {
    //head
    this.head = new THREE.Bone();
    this.head.position.set(x, y, z);
  
    //neck
    this.neck = new THREE.Bone();
    this.neck.position.y = -10;
  
    //torso
    this.torso = new THREE.Bone();
    this.torso.position.y = -20;
  
    this.head.add(this.neck);
    this.neck.add(this.torso);
  
    //left arm
    this.left_upper_arm = new THREE.Bone();
    this.left_upper_arm.position.x = 5;
    this.left_upper_arm.position.y = -5;
    this.neck.add(this.left_upper_arm);
  
    this.left_lower_arm = new THREE.Bone();
    this.left_lower_arm.position.x = 5;
    this.left_lower_arm.position.y = -8;
    this.left_upper_arm.add(this.left_lower_arm);
  
    this.left_hand = new THREE.Bone();
    this.left_hand.position.x = 5;
    this.left_hand.position.y = -5;
    this.left_lower_arm.add(this.left_hand);
  
    //right arm
    this.right_upper_arm = new THREE.Bone();
    this.right_upper_arm.position.x = -5;
    this.right_upper_arm.position.y = -5;
    this.neck.add(this.right_upper_arm);
  
    this.right_lower_arm = new THREE.Bone();
    this.right_lower_arm.position.x = -5;
    this.right_lower_arm.position.y = -8;
    this.right_upper_arm.add(this.right_lower_arm);
  
    this.right_hand = new THREE.Bone();
    this.right_hand.position.x = -5;
    this.right_hand.position.y = -5;
    this.right_lower_arm.add(this.right_hand);
  
    // left leg
    this.left_upper_leg = new THREE.Bone();
    this.left_upper_leg.position.x = 5;
    this.left_upper_leg.position.y = -5;
    this.torso.add(this.left_upper_leg);
  
    this.left_lower_leg = new THREE.Bone();
    this.left_lower_leg.position.x = 3;
    this.left_lower_leg.position.y = -2.5;
    this.left_upper_leg.add(this.left_lower_leg);
  
    this.left_foot = new THREE.Bone();
    this.left_foot.position.x = 3;
    this.left_foot.position.y = -3;
    this.left_lower_leg.add(this.left_foot);
  
    //right leg
    this.right_upper_leg = new THREE.Bone();
    this.right_upper_leg.position.x = -5;
    this.right_upper_leg.position.y = -5;
    this.torso.add(this.right_upper_leg);
  
    this.right_lower_leg = new THREE.Bone();
    this.right_lower_leg.position.x = -3;
    this.right_lower_leg.position.y = -2.5;
    this.right_upper_leg.add(this.right_lower_leg);
  
    this.right_foot = new THREE.Bone();
    this.right_foot.position.x = -3;
    this.right_foot.position.y = -3;
    this.right_lower_leg.add(this.right_foot);
  
    Robot.prototype.show = function (scene) {
      var rGroup = new THREE.Group();
      rGroup.add(this.head);
      var helper = new THREE.SkeletonHelper(rGroup);
      helper.material.linewidth = 5; // make the skeleton thick
      scene.add(rGroup);
      scene.add(helper);
    };
  
    Robot.prototype.raise_left_arm = function () {
      this.movement = "raise left arm";
    };
    Robot.prototype.lower_left_arm = function () {
      this.movement = "lower left arm";
    };
    Robot.prototype.kick = function () {
      this.movement = "kick";
    };
    Robot.prototype.kick_back = function () {
      this.movement = "kick back";
    };
    Robot.prototype.dance = function () {
      this.movement = "dance";
    };
    Robot.prototype.onAnimate = function () {
      var T = -Math.PI;
      if (this.movement == "raise left arm") {
        q = new THREE.Quaternion(Math.sin(T / 2), 0, 0, Math.cos(T / 2));
        this.left_upper_arm.quaternion.slerp(q, 0.1);
      } else if (this.movement == "lower left arm") {
        q = new THREE.Quaternion(0, 0, 0, 1);
        this.left_upper_arm.quaternion.slerp(q, 0.1);
      } else if (this.movement == "lower right arm") {
        q = new THREE.Quaternion(0, 0, 0, 1);
        this.right_upper_arm.quaternion.slerp(q, 0.1);
      } else if (this.movement == "kick") {
        // ... TODO slerping and check once it is done for a backwards slerp
        // you can use the identity quaternion for a backwards slerp
        // console.log(this.right_upper_arm.quaternion.w);
        if (this.right_upper_leg.quaternion.w < 0.72) {
          this.movement = "kick back";
        } else {
          q = new THREE.Quaternion(Math.sin(T / 2), 0, 0, Math.cos(T / 2));
          this.right_upper_leg.quaternion.slerp(q, 0.2);
        }
      } else if (this.movement == "kick back") {
        q = new THREE.Quaternion(0, 0, 0, 1);
        this.right_upper_leg.quaternion.slerp(q, 0.2);
      } else if (this.movement == "dance") {
        if (this.right_upper_arm.quaternion.w < 0.75) {
          q = new THREE.Quaternion(0, 0, 0, 1);
          this.right_upper_arm.quaternion.slerp(q, 0.01);
        } else {
          q = new THREE.Quaternion(Math.sin(T / 2), 0, 0, Math.cos(T / 2));
          this.right_upper_arm.quaternion.slerp(q, 0.2);
        }
        if (this.right_upper_leg.quaternion.w < 0.72) {
          q = new THREE.Quaternion(0, 0, 0, 1);
          this.right_upper_leg.quaternion.slerp(q, 0.01);
        } else {
          q = new THREE.Quaternion(Math.sin(T / 2), 0, 0, Math.cos(T / 2));
          this.right_upper_leg.quaternion.slerp(q, 0.2);
        }
        if (this.left_lower_arm.quaternion.w < 0.75) {
          q = new THREE.Quaternion(0, 0, 0, 1);
          this.left_lower_arm.quaternion.slerp(q, 0.01);
        } else {
          q = new THREE.Quaternion(Math.sin(T / 2), 0, 0, Math.cos(T / 2));
          this.left_lower_arm.quaternion.slerp(q, 0.1);
        }
      }
      console.log(this.movement);
    };
  };