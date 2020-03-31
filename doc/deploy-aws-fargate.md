# Deploy on AWS

## Docker image on ECR

## Create an AWS repository

> aws ecr create-repository --repository-name ctt-server --image-scanning-configuration scanOnPush=true --region eu-west-1

returns:

```json
{
  "repository": {
    "repositoryArn": "arn:aws:ecr:eu-west-1:027555717518:repository/ctt-server",
    "registryId": "027555717518",
    "repositoryName": "ctt-server",
    "repositoryUri": "027555717518.dkr.ecr.eu-west-1.amazonaws.com/ctt-server",
    "createdAt": "2020-03-30T22:57:06+02:00",
    "imageTagMutability": "MUTABLE",
    "imageScanningConfiguration": {
      "scanOnPush": true
    }
  }
}
```

## Push an Image to Amazon ECR

Connect to the registry

> aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 027555717518.dkr.ecr.eu-west-1.amazonaws.com/ctt-server

build the docker image

> docker build -t ctt-server .

Tag the docker image

> docker tag ctt-server:latest 027555717518.dkr.ecr.eu-west-1.amazonaws.com/ctt-server:latest

push the docker image

> docker push 027555717518.dkr.ecr.eu-west-1.amazonaws.com/ctt-server:latest

## Create a Cluster

- Go to the ECS console
- Click button 'Create Cluster'
- Select 'Networking only'
- Click 'next step'
- on Page 'Configure cluster'
  - Cluster name = **ctt-cluster**
  - Check 'Create a new VPC for this cluster'
    - CIDR block = _10.0.0.0/16_
    - Subnet 1 = _10.0.0.0/24_
    - Subnet = _10.0.0.0/24_
  - Click Create

## Create new Task Definition

- Go to the ECS console
- Go to Task Definition menu
- Click button 'Create new Task Definition'
- on Step 1
  - Select 'Fargate' type
  - Click 'Next Step'
- on Step 2
  - on section 'Configure task and container definitions'
    - Task Definition Name = **ctt-task**
    - Task Role = **ecsTaskExecutionRole**
  - on section 'Task size'
    - Task memory (GB) = **0.5GB**
    - Task CPU (vCPU) = **0.25 vCPU**
  - on section 'Container Definitions'
    - click 'Add container'
    - on Add container side panel
      - on section 'Standard'
        - Container name = **ctt-container**
        - image = _copy/paste the uri in ECR Registry, Take the right version inside the repository, not the repository link itself!_
          - **027555717518.dkr.ecr.eu-west-1.amazonaws.com/ctt-server:latest**
        - Private repository authentication = _unckecked_
        - Memory Limits (MiB) = _empty_
        - Port mappings = **80 tcp**
      - on section 'Advanced container configuration'
        - _empty_
    - click 'Add'
  - on section 'Service Integration' = _empty_
  - on section 'Proxy Configuration' = _empty_
  - on section 'Log Router Integration' = _empty_
  - on section 'Volumes' = _empty_
  - on section 'Tags' = _empty_

## Give a name to the vpc

- Go to the VPC Console
- Go to 'Your VPCs' menu
- identify the VPC created and give it a name 'ctt-vpc'

## Create a Certificate in the same region

- Go to ACM Console
- Select the right region 'eu-west-1'
- Select 'Provision certificates'
- on Page 'Request a certificate'
  - Select 'Request a public certificate'
  - Click 'Request a certificate'
- on Page 'Step 1: Add domain names'
  - on section 'Add domain names'
    - Add 'dev-app.space'
    - Add '\*.dev-app.space'
  - Click 'Next'
- on Page 'Select validation method'
  - select 'DNS validation'
- on Page 'Add Tags' = _empty_
- check page _Review_
- Wait for the 2 certificates to be in 'Validation status' = Success

## Create a Load Balancer

- Go to the EC2 Console
- Go to 'Load Balancing' / 'Load Balancer' menu
- Click 'Create Load Balancer'
- on Page 'Select load balancer type'
  - Click 'Application Load Balancer'
- on page 'Step 1. Configure Load Balancer'
  - on section 'Basic Configuration'
    - Name = **ctt-lb**
    - Scheme: _internet-facing_
    - IP address type: _ipv4_
  - on section 'Listeners'
    - Listener:
      - _HTTP 80_
      - Add _HTTPS 443_ (NOT NOW)
  - on section 'Availability Zones'
    - VPC = se;ect **ctt-vpc**
    - Availability Zones = **select both eu-west-1a and eu-west-1b**
  - Click 'Next: Configure Security Settings'
- on page 'Step 2: Configure Security Settings'
  - on section 'Select default certificate'
    - Certificate type = **Choose a certificate from ACM (recommended)**
    - Certificate name = select the certificate created in the same region
  - on section 'Select Security Policy'
    - Security policy = _ELBSecurityPolicy-2016-08_ (see [doc](https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/elb-security-policy-table.html))
  - click 'Next: Configure Security Groups'
- on page 'Step 3: Configure Security Groups'
  - Assign a security group: _Create a new security group_
  - Security group name = **ctt-lb-sg**
  - Select
    - Type = HTTP
    - Type = HTTPS
  - Click 'Next: Configure Routing'
- on page 'Step 4: Configure Routing'
  - on section 'Target group'
    - Target group = New target group
    - Name = **ctt-lb-tg**
    - target type = **IP**
    - Protocol = _HTTP_
    - port = _80_
  - on section 'Health checks'
    - Protocol = 'HTTP'
    - Path = _/_
  - on section 'Advanced health check settings'
    - _empty_
  - Click 'Next: Register Targets'
- on page 'Step 5: Register Targets'
  - _empty_
  - Click 'Next: Review'
- on page 'Step 6: Review'
  - Click 'Create'

## Create a Service

see (part 1) in ping project

- Go to ECS Console
- Go to menu 'Clusters'
- Select the ctt-cluster
- in tab 'Services'
  - Click 'Create'
- on page 'Step 1: Configure service'
  - on section 'Configure service'
    - Launch type = **FARGATE**
    - Task Definition
      - Family = **ctt-task**
      - Revision = _latest_
    - Perform version = _LATEST_
    - Cluster = **ctt-cluster**
    - Service name = **ctt-svc**
    - Service type = _REPLICA_
    - Number of tasks = **1**
    - Minimum healthy percent = _100_
    - Maximum percent = _200_
  - on section 'Deployments'
    - Deployment type = _Rolling update_
  - Click 'Next step'
- on page 'Step 2: Configure network'
  - on section 'VPC and security groups'
    - Cluster VPC = **ctt-vpc**
    - Subnets = **both**
    - Security groups
      - Click 'Edit'
    - on side panel 'Configure security groups'
      - Assigned security groups = **Create new security group**
      - Security group name = **ctt-svc-sg**
      - Description = **for ctt service**
      - Inbound rules for security group
        - HTTP TCP 80
        - HTTPS TCP 443
      - Click 'Save'
    - Auto-assign public IP = **true**
  - on section 'Load balancing'
    - Load balancer type = **Application Load Balancer**
    - Load balancer name = **ctt-lb**
  - come back on section 'Health check grace period'
    - Health check grace period = **30**
  - on section 'Container to load balance'
    - Click on 'Add to load balancer'
    - Target group name = ctt-lb-tg
      - the selection of this target group name will select all the other fields.
  - on section 'Service discovery (optional)'
    - Enable service discovery integration = **disabled**
  - Click 'Next Step'
- on page 'Step 3: Set Auto Scaling (optional)'
  - Service Auto Scaling = _Do not adjust the service’s desired count_
  - Click 'Next Step'
- on page 'Step 4: Review'
  - Click 'Create Service'

## Test access to the task

- Go to ECS Console
- Go to menu 'Clusters'
- Select the ctt-cluster
- in tab 'Task'
- check Last status = 'RUNNING'
- Click on task name (first column)
- in section Network
- copy 'Public IP' = **3.249.126.7**
- browse 'http://52.208.90.189/schedules'
  - it should return results

## Test access to the elb

- Go to the EC2 Console
- Go to 'Load Balancing' / 'Load Balancer' menu
- Select load balancer 'ctt-lb'
- in tab 'Description'
  - in section 'basic Configuration'
  - Copy DNS name = http://ctt-lb-77450784.eu-west-1.elb.amazonaws.com/schedules
- browse 'Copy DNS name = http://ctt-lb-77450784.eu-west-1.elb.amazonaws.com/schedules'
  - it should return results
- browse 'Copy DNS name = https://ctt-lb-77450784.eu-west-1.elb.amazonaws.com/schedules'
  - it should return results (but with warnings)

## Remove direct access to the task

- Go to the EC2 Console
- Go to 'Network & Security' menu
- Go to 'Security Groups' menu
- Select the 'ctt-svc-sg'
- in tab 'inbound rules'
  - Replace Source with = Custom **ctt-lv-sg**
- browse the task (see previous paragraph)
  - it should NOT return ANY results anymore.
- browse the load balancer (see previous paragraph)
  - it should still work.

## Setup Route 53

- Go to Route 53 console
- select your hosted zone
- Click 'Create Record Set'
- in the side panel 'Edit record set'
  - Name = **api.catch-the-train**
  - Type = _A - IPv4 address_
  - Alias = **ctt-lb** (in the ELB list)
  - Routing Policy = _Simple_
  - Evaluate Target Health = _No_
- browse 'http://api.catch-the-train.dev-app.space/schedules'
  - it should return results
- browse 'https://api.catch-the-train.dev-app.space/schedules'
  - BUG

## Pause the task

- Go to ECS Console
- Go to menu 'Clusters'
- Select the ctt-cluster
- Select the 'ctt-svc'
- Click 'Update'
- in page 'Step 1: Configure service '
  - Number of tasks = **1** ==> **0**
  - Click 'Skip to review'
- in page 'Step 4: Review'
  - click 'Update Service'
- in 'ctt-svc' service page
  - you should see Desired count = **0**
  - wait for 'Running count' to become 0

End.
