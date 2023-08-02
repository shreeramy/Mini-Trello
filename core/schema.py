import graphene
from graphene_django import DjangoObjectType
from .models import Task

class TaskType(DjangoObjectType): 
    class Meta:
        model = Task
        fields = "__all__"

# To get all the query objects and filtered objects
class Query(graphene.ObjectType):
    all_tasks = graphene.List(TaskType)
    task = graphene.Field(TaskType, task_id=graphene.Int())

    def resolve_all_tasks(self, info, **kwargs):
        return Task.objects.all()
    
    def resolve_task(self, info, book_id):
        return Task.objects.get(pk=book_id)

# For detail about model fields
class TaskInput(graphene.InputObjectType):
    id = graphene.ID()
    name = graphene.String()
    status = graphene.String()

# Query to Creates objects for the Task
class CreateTask(graphene.Mutation):
    class Arguments:
        task_data = TaskInput()
        
    task = graphene.Field(TaskType)

    @staticmethod
    def mutate(root, info, task_data=None):
        task_instance = Task( 
            name=task_data.name,
            status=task_data.status
        )
        task_instance.save()
        return CreateTask(task=task_instance)

# Query to Update objects for the Task
class UpdateTask(graphene.Mutation):
    class Arguments:
        task_data = TaskInput()
    
    name = graphene.Int(required=True)
    task = graphene.Field(TaskType)

    @staticmethod
    def mutate(root, info, task_data=None):

        task_instance = Task.objects.get(pk=task_data.id)

        if task_instance:
            task_instance.name = task_data.name
            task_instance.status = task_data.status
            task_instance.save()
            return UpdateTask(task=task_instance)
        return UpdateTask(task=None)
    
# Query to Delete objects for the Task
class DeleteTask(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    task = graphene.Field(TaskType)

    @staticmethod
    def mutate(root, info, id):
        task_instance = Task.objects.get(pk=id)
        task_instance.delete()

        return None
    
# Mutation to perform all queries
class Mutation(graphene.ObjectType):
    create_task = CreateTask.Field()
    update_task = UpdateTask.Field()
    delete_task = DeleteTask.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)