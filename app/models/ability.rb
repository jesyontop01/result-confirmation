# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    # Define abilities for the passed in user here. For example:
    #
      user ||= User.new # guest user (not logged in)
      # if user.admin?
      #   can :manage, :all
      # elsif user.audit_role?
      #   can :read, Confirmation
      #   can :manage, :User if user.admin?
      # elsif user.user_role?
      #   can :manage, Confirmation#, user_id: user.id
      #   can :manage, Exam, user_id: user.id 
      # else
      #   can :read, :all
      # end
      if user.role? :admin
        can :manage, :all
      elsif user.role? :exam_staff
        can :manage, User, :id => user.id 
        can :manage, Confirmation#, user_id: user.id
        cannot :destroy, Confirmation
        can :manage, Payment
         # can :manage, PaymentSearch
        can :manage, Exam 
        can :manage, TestResult
      elsif user.role? :audit_staff
        can :read, :all
        can :manage, :User
        can :read, Confirmation
        can :manage, Payment
        can :manage, TestResult
        can :manage, ReceiptBooklet
        can :manage, ReceiptStatus
        can :read, Diet
        can :read, Year
        can :read, :user_permissions, Assignment

      else
        can :read, :all
      end
    #
    # The first argument to `can` is the action you are giving the user
    # permission to do.
    # If you pass :manage it will apply to every action. Other common actions
    # here are :read, :create, :update and :destroy.
    #
    # The second argument is the resource the user can perform the action on.
    # If you pass :all it will apply to every resource. Otherwise pass a Ruby
    # class of the resource.
    #
    # The third argument is an optional hash of conditions to further filter the
    # objects.
    # For example, here the user can only update published articles.
    #
    #   can :update, Article, :published => true
    #
    # See the wiki for details:
    # https://github.com/CanCanCommunity/cancancan/wiki/Defining-Abilities
  end
end
