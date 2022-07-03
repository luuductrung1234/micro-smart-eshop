# full-stack-demo (v01)
[[course](https://amigoscode.com/courses/full-stack-spring-boot-react/)]

## Maven Profiles

1. Package project and publish to local daemon
> using `jib-maven-plugin` [[jib](https://github.com/GoogleContainerTools/jib)] - [[plugin](https://github.com/GoogleContainerTools/jib/blob/master/jib-maven-plugin)]
2. Package project and publish to image Registry
> using `jib-maven-plugin` [[jib](https://github.com/GoogleContainerTools/jib)] - [[plugin](https://github.com/GoogleContainerTools/jib/blob/master/jib-maven-plugin)]
3. Build frontend app and copy to `target/` directory
> using `frontend-maven-plugin` [[plugin](https://github.com/eirslett/frontend-maven-plugin)]
> 
> using `maven-resources-plugin`  [[plugin](https://maven.apache.org/plugins/maven-resources-plugin/)]

## Hosting

AWS [[docs](https://docs.aws.amazon.com/index.html)]

AWS Free Tier [[free offer](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc&awsf.Free%20Tier%20Types=*all&awsf.Free%20Tier%20Categories=*all)] [[get started](https://docs.aws.amazon.com/whitepapers/latest/how-aws-pricing-works/get-started-with-the-aws-free-tier.html)]

1. Host web application 
> using EC2 (Elastic Beanstalk) [[overview](https://aws.amazon.com/ec2/)]

_[Terminate EB Environment](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.terminating.html)_

_[Restore terminated EB Environment](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/environment-management-rebuild.html)_

2. Host database
> using RDS (Relational Database Service) [[overview](https://aws.amazon.com/rds/)]

_[Controlling access with RDS security groups](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Overview.RDSSecurityGroups.html)_

## Deploy

GitHub Actions [[docs](https://github.com/features/actions)]

